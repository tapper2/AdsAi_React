import { Fragment, useMemo } from 'react';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Card, CardContent } from '@/components/ui/card';
import { useCampaignsStore } from '../store/useCampaignsStore';

const StatisticQuebs = () => {
  const { campaignsData } = useCampaignsStore();

  const stats = useMemo(() => {
    if (!campaignsData || campaignsData.length === 0) {
      return {
        clicks: 0,
        cost: 0,
        impressions: 0,
        conversions: 0,
        cpc: 0,
        ctr: 0,
      };
    }

    const totals = campaignsData.reduce(
      (acc, item) => {
        const metrics = item.metrics || {};
        acc.clicks += Number(metrics.clicks || 0);
        acc.impressions += Number(metrics.impressions || 0);
        acc.conversions += Number(metrics.conversions || 0);
        acc.costMicros += Number(metrics.cost_micros || 0);
        return acc;
      },
      { clicks: 0, impressions: 0, conversions: 0, costMicros: 0 }
    );

    const totalCost = totals.costMicros / 1000000;
    const avgCpc = totals.clicks > 0 ? totalCost / totals.clicks : 0;
    const ctr = totals.impressions > 0 ? (totals.clicks / totals.impressions) * 100 : 0;

    return {
      clicks: totals.clicks.toLocaleString('en-US'),
      cost: totalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      impressions: totals.impressions.toLocaleString('en-US'),
      conversions: totals.conversions.toLocaleString('en-US'),
      cpc: avgCpc.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      ctr: ctr.toFixed(2),
    };
  }, [campaignsData]);

  const items = [
    { info: stats.clicks, desc: 'קליקים' },
    { info: stats.cost, desc: 'עלות כוללת' },
    { info: stats.impressions, desc: 'הופעות' },
    { info: stats.conversions, desc: 'המרות' },
    { info: stats.cpc, desc: 'עלות ממוצעת לקליק' },
    { info: stats.ctr + '%', desc: 'אחוז הקלקות (ctr)' },
  ];

  // const qubesColors = [
  //   "#E0F2FE", // 0: כחול רך (צפיות)
  //   "#F3E8FF", // 1: סגול רך (ביצועים)
  //   "#FEF3C7", // 2: צהוב רך (מעורבות)
  //   "#D1FAE5", // 3: ירוק רך (צמיחה/מנויים)
  //   "#F3F4F6", // 4: אפור רך (קהל/סטרימינג)
  //   "#FCE7F6", // 5: ורוד רך (קהילה/חברתי)
  // ];

  const qubesColors = [
    "#BAE6FD", // 0: תכלת שמיים (יותר רווי מהקודם)
    "#DDD6FE", // 1: סגול לבנדר עדין
    "#FDE68A", // 2: צהוב חמניה בהיר
    "#A7F3D0", // 3: ירוק מנטה חי
    "#E5E7EB", // 4: אפור קריסטל (נקי יותר)
    "#FBCFE8", // 5: ורוד מסטיק עדין
  ];

  const renderItem = (item, index) => {
    const color = "#EFF6FF"
    return (
      <Card key={index}>
        <CardContent className="p-0 pt-3 flex flex-col  justify-between gap-6 h-full bg-cover rtl:bg-[left_top_-1.7rem] bg-[right_top_-1.7rem] bg-no-repeat channel-stats-bg" style={{ backgroundColor: qubesColors[index] }}>
          <div className="flex flex-col gap-1 pb-4 px-5">
            <span className="text-3xl font-semibold text-mono">
              {item.info}
            </span>
            <span className="text-sm font-normal text-muted-forehead">
              {item.desc}
            </span>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <Fragment>
      <style>
        {`
          .channel-stats-bg {
            background-image: url('${toAbsoluteUrl('/media/images/2600x1600/bg-3.png')}');
          }
          .dark .channel-stats-bg {
            background-image: url('${toAbsoluteUrl('/media/images/2600x1600/bg-3-dark.png')}');
          }
        `}
      </style>

      {items.map((item, index) => {
        return renderItem(item, index);
      })}
    </Fragment>
  );
};

export { StatisticQuebs };
