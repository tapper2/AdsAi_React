import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays } from "lucide-react";
import { format, subDays, startOfDay, endOfDay } from "date-fns";
import { useCampaignsStore } from "../store/useCampaignsStore";

export function DateRangePicker() {
    const [isOpen, setIsOpen] = useState(false);

    const date = useCampaignsStore((state) => state.date);
    const setDate = useCampaignsStore((state) => state.setDate);

    const [tempDateRange, setTempDateRange] = useState(date);

    useEffect(() => {
        setTempDateRange(date);
    }, [date]);

    const apply = () => {
        if (!tempDateRange?.from || !tempDateRange?.to) return;

        setDate({
            from: startOfDay(tempDateRange.from),
            to: endOfDay(tempDateRange.to),
        });

        setIsOpen(false);
    };

    const reset = () => {
        const today = new Date();

        const newRange = {
            from: startOfDay(today),
            to: endOfDay(today),
        };

        setDate(newRange);
        setTempDateRange(newRange);
    };

    const quickSelect = (daysBack) => {
        const today = new Date();

        if (daysBack === "all") {
            setDate({
                from: new Date(2000, 0, 1),
                to: endOfDay(today),
            });
            setIsOpen(false);
            return;
        }

        if (daysBack == "1") {
            setDate({
                from: startOfDay(subDays(today, daysBack)),
                to: endOfDay(subDays(today, daysBack)),
            });
            setIsOpen(false);
            return;
        }

        const from = startOfDay(subDays(today, daysBack));
        const to = endOfDay(today);

        setDate({ from, to });
        setTempDateRange({ from, to });
        setIsOpen(false);
    };

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline">
                    <CalendarDays size={16} className="me-0.5" />
                    {date?.from ? (
                        <>
                            {format(date.from, "LLL dd, y")} -{" "}
                            {format(date.to, "LLL dd, y")}
                        </>
                    ) : (
                        "Pick a date range"
                    )}
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                    initialFocus
                    mode="range"
                    selected={tempDateRange}
                    onSelect={setTempDateRange}
                    numberOfMonths={2}
                />

                <div className="flex flex-wrap justify-end gap-1.5 border-t p-3">
                    <Button variant="outline" onClick={() => quickSelect("all")}>
                        All Time
                    </Button>
                    <Button variant="outline" onClick={() => quickSelect(30)}>
                        Month
                    </Button>
                    <Button variant="outline" onClick={() => quickSelect(7)}>
                        Week
                    </Button>
                    <Button variant="outline" onClick={() => quickSelect(1)}>
                        Yesterday
                    </Button>
                    <Button variant="outline" onClick={() => quickSelect(0)}>
                        Today
                    </Button>
                    <Button variant="destructive" onClick={reset}>
                        Reset
                    </Button>
                    <Button onClick={apply}>Apply</Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
