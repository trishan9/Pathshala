import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
    '/_protected/_dashboard/_staff/evaluate-performance',
)({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <main className="p-4 w-full">
            <StudentPerformanceForm />
        </main>
    )
}

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { PredictionResults } from "@/components/PredictionResults"
import { apiActions } from '@/api'

const formSchema = z.object({
    parentalEducation: z.string().min(1, "Please select parental education level"),
    studyTimeWeekly: z.number().min(0).max(20),
    absences: z.number().min(0).max(30),
    tutoring: z.boolean(),
    parentalSupport: z.string().min(1, "Please select parental support level"),
    extracurricular: z.boolean(),
    sports: z.boolean(),
    music: z.boolean(),
    gpa: z.number().min(2).max(4)
})

type FormValues = z.infer<typeof formSchema>

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

export default function StudentPerformanceForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null)

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            parentalEducation: "",
            studyTimeWeekly: 10,
            absences: 0,
            tutoring: false,
            parentalSupport: "",
            extracurricular: false,
            sports: false,
            music: false,
            gpa: 2,
        },
    })

    async function onSubmit(data: FormValues) {
        setIsLoading(true)

        try {
            await new Promise((resolve) => setTimeout(resolve, 1500))
            const apiData = {
                ...data,
                parentalEducation: Number.parseInt(data.parentalEducation),
                parentalSupport: Number.parseInt(data.parentalSupport),
                tutoring: data.tutoring ? 1 : 0,
                extracurricular: data.extracurricular ? 1 : 0,
                sports: data.sports ? 1 : 0,
                music: data.music ? 1 : 0,
            }

            const features = [apiData.parentalEducation, apiData.studyTimeWeekly, apiData.absences, apiData.tutoring, apiData.parentalSupport, apiData.extracurricular, apiData.sports, apiData.music, apiData.gpa]
            const response = await apiActions.student.evaluatePerformance(features);
            if (!response.data) {
                throw new Error("Failed to create event");
            }
            setPredictionResult(response.data)
        } catch (error) {
            console.error("Error submitting form:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="grid md:grid-cols-2 gap-4">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Student Information</CardTitle>
                    <CardDescription>Enter student details to predict academic performance</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="parentalEducation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Parental Education</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select education level" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="0">None</SelectItem>
                                                <SelectItem value="1">High School</SelectItem>
                                                <SelectItem value="2">Some College</SelectItem>
                                                <SelectItem value="3">Bachelor's</SelectItem>
                                                <SelectItem value="4">Higher</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>The highest education level of the parents</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="studyTimeWeekly"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Weekly Study Time (Hours): {field.value}</FormLabel>
                                        <FormControl>
                                            <Slider
                                                min={0}
                                                max={20}
                                                step={1}
                                                value={[field.value]}
                                                onValueChange={(value) => field.onChange(value[0])}
                                            />
                                        </FormControl>
                                        <FormDescription>Weekly study time in hours (0-20)</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="absences"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Number of Absences</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min={0}
                                                max={30}
                                                {...field}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormDescription>Number of absences during the school year (0-30)</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="tutoring"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">Tutoring</FormLabel>
                                            <FormDescription>Does the student receive tutoring?</FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="parentalSupport"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Parental Support</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select support level" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="0">None</SelectItem>
                                                <SelectItem value="1">Low</SelectItem>
                                                <SelectItem value="2">Moderate</SelectItem>
                                                <SelectItem value="3">High</SelectItem>
                                                <SelectItem value="4">Very High</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>The level of parental support</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <FormField
                                    control={form.control}
                                    name="extracurricular"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                            <div className="space-y-0.5">
                                                <FormLabel className="text-base">Extracurricular</FormLabel>
                                            </div>
                                            <FormControl>
                                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="sports"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                            <div className="space-y-0.5">
                                                <FormLabel className="text-base">Sports</FormLabel>
                                            </div>
                                            <FormControl>
                                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="music"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                            <div className="space-y-0.5">
                                                <FormLabel className="text-base">Music</FormLabel>
                                            </div>
                                            <FormControl>
                                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="gpa"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Average GPA: {field.value}</FormLabel>
                                        <FormControl>
                                            <Slider
                                                min={2}
                                                max={4}
                                                step={0.1}
                                                value={[field.value]}
                                                onValueChange={(value) => field.onChange(value[0])}
                                            />
                                        </FormControl>
                                        <FormDescription>GPA on a scale from 2.0 to 4.0, influenced by study habits, and other activities.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Predicting...
                                    </>
                                ) : (
                                    "Predict Performance"
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <div className="w-full">
                {predictionResult ? (
                    <PredictionResults result={predictionResult} />
                ) : (
                    <Card className="w-full h-full flex items-center justify-center">
                        <CardContent className="pt-6 text-center">
                            <p className="text-muted-foreground">Fill out the form and submit to see performance prediction</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}

