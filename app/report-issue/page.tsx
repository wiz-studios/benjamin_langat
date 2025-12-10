import { IssueForm } from "@/components/issues/issue-form"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Report an Issue - Hon. Benjamin Langat",
    description: "Report constituency issues directly to the MP's office. Track infrastructure, social, and service delivery problems in your ward.",
}

export default function ReportIssuePage() {
    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Constituency Issue Reporting
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Identify a problem in your area? Let us know directly.
                        Use this form to report issues regarding roads, water, schools, or security.
                        Your feedback helps us prioritize development.
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden p-6 md:p-8">
                    <IssueForm />
                </div>
            </div>
        </main>
    )
}
