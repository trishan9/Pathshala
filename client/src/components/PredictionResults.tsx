import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

type PredictionResult = {
  prediction: string
  probabilities: {
    "A (GPA >= 3.5)": string
    "B (3.0 <= GPA < 3.5)": string
    "C (2.5 <= GPA < 3.0)": string
    "D (2.0 <= GPA < 2.5)": string
    "F (GPA < 2.0)": string
  }
  message: string
}

type PredictionResultsProps = {
  result: PredictionResult
}

export function PredictionResults({ result }: PredictionResultsProps) {
  // Convert probability strings to numbers for the progress bars
  const probabilities = Object.entries(result.probabilities).map(([grade, probability]) => ({
    grade,
    value: Number.parseFloat(probability.replace("%", "")),
  }))

  // Sort probabilities in descending order
  probabilities.sort((a, b) => b.value - a.value)

  // Get color based on grade
  const getGradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "bg-green-500"
    if (grade.startsWith("B")) return "bg-blue-500"
    if (grade.startsWith("C")) return "bg-yellow-500"
    if (grade.startsWith("D")) return "bg-orange-500"
    return "bg-red-500"
  }

  // Get text color based on grade
  const getGradeTextColor = (grade: string) => {
    if (grade.startsWith("A")) return "text-green-500"
    if (grade.startsWith("B")) return "text-blue-500"
    if (grade.startsWith("C")) return "text-yellow-500"
    if (grade.startsWith("D")) return "text-orange-500"
    return "text-red-500"
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
          Prediction Results
        </CardTitle>
        <CardDescription>Based on the provided information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center p-4 border rounded-lg bg-muted/50">
          <h3 className="text-lg font-medium mb-1">Predicted Performance</h3>
          <p className={`text-3xl font-bold ${getGradeTextColor(result.prediction)}`}>{result.prediction}</p>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3">Grade Probabilities</h3>
          <div className="space-y-3">
            {probabilities.map(({ grade, value }) => (
              <div key={grade} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{grade}</span>
                  <span>{value.toFixed(2)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div className={`h-2.5 rounded-full ${getGradeColor(grade)}`} style={{ width: `${value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2 border-t">
          <p className="text-sm text-muted-foreground">{result.message}</p>
        </div>
      </CardContent>
    </Card>
  )
}

