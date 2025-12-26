import React, { useEffect, useState } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-calendar-heatmap/dist/styles.css';
import axiosClient from '../utils/axiosClient';

const ActivityHeatmap = ({ username }) => {
    // Helper to format date as YYYY-MM-DD
    const formatDate = (date) => {
        return date.toISOString().split('T')[0];
    };

    const [heatmapData, setHeatmapData] = useState({});
    const [loading, setLoading] = useState(true);
    const [months, setMonths] = useState([]);
    const [totalSubmissions, setTotalSubmissions] = useState(0);

    const getContributionColor = (count) => {
        if (count === 0) return 'bg-white/10 hover:bg-white/20';
        if (count && count <= 2) return 'bg-emerald-900/60 hover:bg-emerald-900 hover:shadow-[0_0_8px_rgba(16,185,129,0.2)]';
        if (count > 2 && count <= 4) return 'bg-emerald-700/80 hover:bg-emerald-700 hover:shadow-[0_0_10px_rgba(16,185,129,0.4)]';
        if (count > 4 && count <= 6) return 'bg-emerald-500 hover:bg-emerald-400 hover:shadow-[0_0_12px_rgba(16,185,129,0.6)]';
        return 'bg-emerald-400 hover:bg-emerald-300 hover:shadow-[0_0_15px_rgba(52,211,153,0.8)]';
    };

    useEffect(() => {
        if (!username) {
            setLoading(false);
            return;
        }

        const fetchStats = async () => {
            try {
                const response = await axiosClient.get(`/profile/${username}/activity`);
                const apiData = response.data?.activity || [];

                // Map data for quick lookup
                const dataMap = {};
                let total = 0;
                apiData.forEach(item => {
                    dataMap[item.date] = item.count;
                    total += item.count;
                });
                setTotalSubmissions(total);
                setHeatmapData(dataMap);

                // Generate last 12 months structure
                const monthBuckets = [];
                const today = new Date();

                // Iterate back 11 months + current month (total 12)
                for (let i = 11; i >= 0; i--) {
                    const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
                    const monthName = d.toLocaleString('default', { month: 'short' });
                    const year = d.getFullYear();
                    const daysInMonth = new Date(year, d.getMonth() + 1, 0).getDate();

                    const days = [];

                    // Add padding for start of month
                    // getDay() returns 0 for Sunday, 1 for Monday, etc.
                    // Since our grid flows column-wise but fills rows 0-6 (Sun-Sat), 
                    // we need padding cells to push the first day to the correct row index.
                    const startDayOfWeek = new Date(year, d.getMonth(), 1).getDay();

                    for (let p = 0; p < startDayOfWeek; p++) {
                        days.push({
                            date: null,
                            count: null,
                            empty: true
                        });
                    }

                    for (let day = 1; day <= daysInMonth; day++) {
                        const currentDay = new Date(year, d.getMonth(), day);
                        const dateStr = formatDate(currentDay);
                        days.push({
                            date: dateStr,
                            count: dataMap[dateStr] || 0,
                            dayOfWeek: currentDay.getDay(),
                            empty: false
                        });
                    }
                    monthBuckets.push({ name: monthName, year, days });
                }

                setMonths(monthBuckets);

            } catch (error) {
                console.error("Failed to fetch heatmap data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [username]);


    if (loading) {
        return (
            <div className="animate-pulse flex gap-3">
                <div className="h-44 w-full bg-white/5 rounded-xl"></div>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-6">
                <span className="text-white font-medium text-base">
                    {totalSubmissions} submissions in the past year
                </span>
                {/* Legend */}
                <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
                    <span>Less</span>
                    <div className="w-3.5 h-3.5 rounded-sm bg-white/10"></div>
                    <div className="w-3.5 h-3.5 rounded-sm bg-emerald-900/60"></div>
                    <div className="w-3.5 h-3.5 rounded-sm bg-emerald-700/80"></div>
                    <div className="w-3.5 h-3.5 rounded-sm bg-emerald-500"></div>
                    <div className="w-3.5 h-3.5 rounded-sm bg-emerald-400"></div>
                    <span>More</span>
                </div>
            </div>

            <div className="flex gap-6 w-full overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-emerald-500/20 scrollbar-track-transparent">
                {months.map((month, idx) => (
                    <div key={idx} className="flex flex-col gap-3">
                        {/* Month Grid */}
                        <div className="grid grid-rows-7 grid-flow-col gap-1.5">
                            {month.days.map((day, dIdx) => (
                                day.empty ? (
                                    <div key={dIdx} className="w-3.5 h-3.5 lg:w-4 lg:h-4 rounded-[3px] bg-transparent"></div>
                                ) : (
                                    <div
                                        key={dIdx}
                                        className={`w-3.5 h-3.5 lg:w-4 lg:h-4 rounded-[3px] ${getContributionColor(day.count)} cursor-pointer transition-all duration-300 transform hover:scale-125 hover:z-10`}
                                        data-tooltip-id="heatmap-tooltip"
                                        data-tooltip-html={`<div class='font-bold'>${day.count} submissions</div><div class='text-zinc-400 text-xs'>${new Date(day.date).toDateString()}</div>`}
                                    ></div>
                                )
                            ))}
                        </div>
                        <span className="text-xs font-bold text-zinc-500 text-center uppercase tracking-wider">{month.name}</span>
                    </div>
                ))}
            </div>

            <ReactTooltip 
                id="heatmap-tooltip" 
                className="!bg-black/90 !border !border-white/10 !text-white !px-3 !py-2 !rounded-xl !shadow-xl !backdrop-blur-md !z-50"
                place="top"
                offset={10}
            />
        </div>
    );
};

export default ActivityHeatmap;
