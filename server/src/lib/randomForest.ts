interface ScalerParams {
  mean: number[];
  scale: number[];
}

interface TreeData {
  tree_index: number;
  n_node_samples: number[];
  children_left: number[];
  children_right: number[];
  feature: number[];
  threshold: number[];
  value: number[][][];
}

interface RandomForestParams {
  n_estimators: number;
  n_classes: number;
  n_features: number;
  trees: TreeData[];
  classes: number[] | string[];
}

interface ModelData {
  scaler: ScalerParams;
  random_forest: RandomForestParams;
}

export class RandomForestClassifier {
  private scaler: ScalerParams;
  private forest: RandomForestParams;
  private classes: number[] | string[];

  constructor(modelData: ModelData) {
    this.scaler = modelData.scaler;
    this.forest = modelData.random_forest;
    this.classes = this.forest.classes;
  }

  // Apply standard scaling to features
  private standardize(features: number[]): number[] {
    if (features.length !== this.scaler.mean.length) {
      throw new Error(
        `Feature count mismatch: expected ${this.scaler.mean.length}, got ${features.length}`,
      );
    }

    return features.map(
      (value, i) => (value - this.scaler.mean[i]) / this.scaler.scale[i],
    );
  }

  // Predict class for a single instance using a single tree
  private predictTree(features: number[], treeIndex: number): number[] {
    const tree = this.forest.trees[treeIndex];
    let nodeId = 0;

    // Navigate the tree until we reach a leaf
    while (true) {
      if (tree.children_left[nodeId] === -1) {
        // Leaf node
        break;
      }

      // Test the feature value against the threshold
      if (features[tree.feature[nodeId]] <= tree.threshold[nodeId]) {
        nodeId = tree.children_left[nodeId];
      } else {
        nodeId = tree.children_right[nodeId];
      }
    }

    // Return the class probabilities for this tree
    return tree.value[nodeId][0];
  }

  // Main prediction function
  predict(features: number[]): number | string {
    // Apply scaling first
    const scaledFeatures = this.standardize(features);

    // Initialize the class vote counter
    const classVotes: number[] = new Array(this.forest.n_classes).fill(0);

    // Get votes from each tree
    for (let i = 0; i < this.forest.n_estimators; i++) {
      const treePrediction = this.predictTree(scaledFeatures, i);

      // Find the class with highest probability in this tree
      let maxIndex = 0;
      let maxValue = treePrediction[0];
      for (let j = 1; j < treePrediction.length; j++) {
        if (treePrediction[j] > maxValue) {
          maxValue = treePrediction[j];
          maxIndex = j;
        }
      }

      // Add a vote for this class
      classVotes[maxIndex]++;
    }

    // Return the class with the most votes
    let maxVotes = 0;
    let predictedClass = 0;
    for (let i = 0; i < classVotes.length; i++) {
      if (classVotes[i] > maxVotes) {
        maxVotes = classVotes[i];
        predictedClass = i;
      }
    }

    return this.classes[predictedClass];
  }

  // Get class probabilities
  predictProba(features: number[]): Record<string | number, number> {
    const scaledFeatures = this.standardize(features);

    // Initialize the class probabilities
    const classProbs: number[] = new Array(this.forest.n_classes).fill(0);

    // Sum probabilities from each tree
    for (let i = 0; i < this.forest.n_estimators; i++) {
      const treePrediction = this.predictTree(scaledFeatures, i);
      const tree = this.forest.trees[i];

      for (let j = 0; j < treePrediction.length; j++) {
        // Fixed: Using current tree's n_node_samples instead of undefined variable
        classProbs[j] += treePrediction[j] / tree.n_node_samples[0]; // Normalize by total samples
      }
    }

    // Average the probabilities across all trees
    for (let i = 0; i < classProbs.length; i++) {
      classProbs[i] /= this.forest.n_estimators;
    }

    // Return object mapping class labels to probabilities
    const result: Record<string | number, number> = {};
    for (let i = 0; i < this.classes.length; i++) {
      result[this.classes[i].toString()] = classProbs[i];
    }

    return result;
  }
}

