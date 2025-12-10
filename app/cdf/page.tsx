"use client"

import { FileText, Download, TrendingUp, Wallet, CheckCircle, ExternalLink, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts"

export default function CDFPage() {
    const allocations = [
        { year: "2025/2026", amount: "202,243,910.00", status: "Allocated" },
        { year: "2024/2025", amount: "188,414,052.19", status: "Allocated" },
        { year: "2023/2024", amount: "184,129,901.00", status: "Allocated" },
        { year: "2022/2023", amount: "151,960,174.00", status: "Allocated" },
    ]

    const disbursements = [
        { date: "13 May 2025", amount: "20,000,000.00" },
        { date: "29 Apr 2025", amount: "20,000,000.00" },
        { date: "04 Jan 2025", amount: "23,000,000.00" },
    ]

    const auditReports = [
        {
            title: "Ainamoi NG-CDF Audit Report 2019-2020",
            type: "Qualified Opinion",
            year: "2020",
            url: "https://www.oagkenya.go.ke/wp-content/uploads/2022/08/Ainamoi-NGCDF-2019-2020.pdf",
        },
        {
            title: "Auditor-General Report - Ainamoi Constituency 2021",
            type: "Financial Statements",
            year: "2021",
            url: "https://www.parliament.go.ke/sites/default/files/2023-03/Report%20of%20the%20Auditor-General%20and%20Financial%20Statements%20for%20%20Ainamoi%20Constituency%20for%20the%20year%20ended%2030th%20June%2C%202021.pdf",
        },
        {
            title: "Auditor-General Report - Ainamoi Constituency 2023",
            type: "Financial Statements",
            year: "2023",
            url: "https://libraryir.parliament.go.ke/items/cc2302c2-c40f-4c2f-8a37-6d24fbd126a6",
        },
    ]

    const totalDisbursed = disbursements.reduce((sum, d) => sum + parseFloat(d.amount.replace(/,/g, "")), 0)

    // Chart data
    const chartData = [
        {
            year: "2022/23",
            allocation: 151.96,
            disbursed: 0, // No data available
        },
        {
            year: "2023/24",
            allocation: 184.13,
            disbursed: 0, // No data available
        },
        {
            year: "2024/25",
            allocation: 188.41,
            disbursed: 63.0, // Recent confirmed transfers
        },
        {
            year: "2025/26",
            allocation: 202.24,
            disbursed: 0, // Future year
        },
    ]

    const trendData = allocations.map((a) => ({
        year: a.year,
        amount: parseFloat(a.amount.replace(/,/g, "")) / 1000000,
    })).reverse()

    return (
        <main className="py-16 bg-[#F5F5F5]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-black mb-4">
                        NG-CDF Allocations & Disbursements
                    </h1>
                    <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                        Transparent reporting of National Government Constituency Development Fund allocations and
                        disbursements for Ainamoi Constituency
                    </p>
                </div>

                {/* Disclaimer / Legal Notice */}
                <div className="bg-white rounded-xl p-6 shadow-md mb-8 border-l-4 border-[#FFD700]">
                    <h2 className="text-lg font-semibold text-black mb-3 flex items-center gap-2">
                        <FileText className="h-5 w-5 text-[#FFD700]" />
                        Official Sources & Transparency
                    </h2>
                    <p className="text-gray-700 text-sm leading-relaxed">
                        The figures below are taken from the{" "}
                        <a
                            href="https://ainamoi.ngcdf.go.ke"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#FFD700] hover:underline font-semibold"
                        >
                            Ainamoi NG-CDF office publications
                        </a>{" "}
                        and the{" "}
                        <a
                            href="https://www.oagkenya.go.ke"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#FFD700] hover:underline font-semibold"
                        >
                            Auditor-General's reports
                        </a>
                        . They represent <em>allocated</em> NG-CDF amounts per fiscal year and <em>confirmed disbursement
                            transfers</em> published by the constituency office. This is not yet a full audit-grade ledger for
                        2008–present; we are collecting and publishing official source documents as they become available.
                    </p>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="bg-[#FFD700] p-3 rounded-lg">
                                <Wallet className="h-6 w-6 text-black" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Latest Allocation</p>
                                <p className="text-2xl font-bold text-black">KSh 202.2M</p>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500">FY 2025/2026</p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="bg-green-500 p-3 rounded-lg">
                                <CheckCircle className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Recent Disbursements</p>
                                <p className="text-2xl font-bold text-black">KSh {(totalDisbursed / 1000000).toFixed(1)}M</p>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500">FY 2024/2025 (Confirmed)</p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="bg-blue-500 p-3 rounded-lg">
                                <TrendingUp className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">4-Year Total</p>
                                <p className="text-2xl font-bold text-black">KSh 726.7M</p>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500">2022/23 - 2025/26</p>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Allocation vs Disbursement Chart */}
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
                            <BarChart3 className="h-5 w-5 text-[#FFD700]" />
                            Allocation vs Disbursement
                        </h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="year" />
                                <YAxis label={{ value: 'Million KSh', angle: -90, position: 'insideLeft' }} />
                                <Tooltip formatter={(value) => `KSh ${value}M`} />
                                <Legend />
                                <Bar dataKey="allocation" fill="#FFD700" name="Allocated" />
                                <Bar dataKey="disbursed" fill="#22c55e" name="Disbursed" />
                            </BarChart>
                        </ResponsiveContainer>
                        <p className="text-xs text-gray-500 mt-3 text-center">
                            Comparison of allocated funds vs confirmed disbursements (in millions)
                        </p>
                    </div>

                    {/* Allocation Trend Chart */}
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-blue-500" />
                            Allocation Trend (4 Years)
                        </h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={trendData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="year" />
                                <YAxis label={{ value: 'Million KSh', angle: -90, position: 'insideLeft' }} />
                                <Tooltip formatter={(value) => `KSh ${value}M`} />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="amount"
                                    stroke="#3b82f6"
                                    strokeWidth={3}
                                    name="Allocation"
                                    dot={{ fill: '#3b82f6', r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                        <p className="text-xs text-gray-500 mt-3 text-center">
                            Year-over-year growth in NG-CDF allocations
                        </p>
                    </div>
                </div>

                {/* Allocations Table */}
                <div className="bg-white rounded-xl shadow-md mb-8 overflow-hidden">
                    <div className="bg-[#FFD700] px-6 py-4">
                        <h2 className="text-2xl font-bold text-black">Official NG-CDF Allocations</h2>
                        <p className="text-sm text-black/80 mt-1">
                            Source:{" "}
                            <a
                                href="https://ainamoi.ngcdf.go.ke/allocations/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline hover:text-black"
                            >
                                Ainamoi NG-CDF Allocations Page
                            </a>
                        </p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="text-left p-4 font-semibold text-black">Financial Year</th>
                                    <th className="text-left p-4 font-semibold text-black">Allocated Amount (KSh)</th>
                                    <th className="text-left p-4 font-semibold text-black">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allocations.map((allocation, index) => (
                                    <tr
                                        key={index}
                                        className={`border-b border-gray-200 hover:bg-[#FFD700]/5 ${index === 0 ? "bg-[#FFD700]/10" : ""
                                            }`}
                                    >
                                        <td className="p-4 text-gray-700 font-medium">{allocation.year}</td>
                                        <td className="p-4 text-gray-900 font-bold">
                                            {allocation.amount.toLocaleString()}
                                        </td>
                                        <td className="p-4">
                                            <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                                <CheckCircle className="h-4 w-4" />
                                                {allocation.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot className="bg-gray-50">
                                <tr>
                                    <td className="p-4 font-bold text-black">Total (4 Years)</td>
                                    <td className="p-4 font-bold text-black text-lg">
                                        KSh{" "}
                                        {allocations
                                            .reduce((sum, a) => sum + parseFloat(a.amount.replace(/,/g, "")), 0)
                                            .toLocaleString()}
                                    </td>
                                    <td></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>

                {/* Disbursements Table */}
                <div className="bg-white rounded-xl shadow-md mb-8 overflow-hidden">
                    <div className="bg-green-600 px-6 py-4">
                        <h2 className="text-2xl font-bold text-white">Recent Confirmed Disbursements</h2>
                        <p className="text-sm text-white/90 mt-1">
                            Source:{" "}
                            <a
                                href="https://ainamoi.ngcdf.go.ke/disbursements/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline hover:text-white"
                            >
                                Ainamoi NG-CDF Disbursements Page
                            </a>
                        </p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="text-left p-4 font-semibold text-black">Transfer Date</th>
                                    <th className="text-left p-4 font-semibold text-black">Amount Disbursed (KSh)</th>
                                    <th className="text-left p-4 font-semibold text-black">Fiscal Year</th>
                                </tr>
                            </thead>
                            <tbody>
                                {disbursements.map((disbursement, index) => (
                                    <tr key={index} className="border-b border-gray-200 hover:bg-green-50">
                                        <td className="p-4 text-gray-700 font-medium">{disbursement.date}</td>
                                        <td className="p-4 text-gray-900 font-bold">
                                            {parseFloat(disbursement.amount).toLocaleString()}
                                        </td>
                                        <td className="p-4 text-gray-600">2024/2025</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot className="bg-gray-50">
                                <tr>
                                    <td className="p-4 font-bold text-black">Total Confirmed Transfers (FY 2024/2025)</td>
                                    <td className="p-4 font-bold text-black text-lg">
                                        KSh {totalDisbursed.toLocaleString()}
                                    </td>
                                    <td></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>

                {/* Audit Reports */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                    <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
                        <FileText className="h-6 w-6 text-[#FFD700]" />
                        Auditor-General Reports
                    </h2>
                    <p className="text-gray-700 mb-6">
                        Official audit reports from the Office of the Auditor-General of Kenya for Ainamoi NG-CDF.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {auditReports.map((report, index) => (
                            <div
                                key={index}
                                className="border border-gray-200 rounded-lg p-4 hover:border-[#FFD700] hover:shadow-md transition-all"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="bg-[#FFD700]/10 p-2 rounded">
                                        <FileText className="h-5 w-5 text-[#FFD700]" />
                                    </div>
                                    <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                                        FY {report.year}
                                    </span>
                                </div>
                                <h3 className="font-semibold text-black text-sm mb-2">{report.title}</h3>
                                <p className="text-xs text-gray-600 mb-3">{report.type}</p>
                                <Button
                                    asChild
                                    size="sm"
                                    className="w-full bg-[#FFD700] text-black hover:bg-[#E6C200] text-xs"
                                >
                                    <a href={report.url} target="_blank" rel="noopener noreferrer">
                                        <Download className="h-3 w-3 mr-1" />
                                        View Report
                                        <ExternalLink className="h-3 w-3 ml-1" />
                                    </a>
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Additional Resources */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-black mb-3">Additional Resources</h3>
                    <ul className="space-y-2">
                        <li>
                            <a
                                href="https://ainamoi.ngcdf.go.ke"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-700 hover:text-blue-900 hover:underline flex items-center gap-2"
                            >
                                <ExternalLink className="h-4 w-4" />
                                Official Ainamoi NG-CDF Website
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.oagkenya.go.ke"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-700 hover:text-blue-900 hover:underline flex items-center gap-2"
                            >
                                <ExternalLink className="h-4 w-4" />
                                Office of the Auditor-General of Kenya
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.oagkenya.go.ke/wp-content/uploads/2025/08/National-Government-Constituency-Development-Funds-NGCDF-2023-2024.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-700 hover:text-blue-900 hover:underline flex items-center gap-2"
                            >
                                <ExternalLink className="h-4 w-4" />
                                NG-CDF National Summary Report 2023-2024
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </main>
    )
}
