import { Fragment } from 'react';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Card, CardContent } from '@/components/ui/card';
import CampainDetailsData from '../data/CampainDetailsData';

const CampainStatisticQuebs = () => {
  console.log("Details : ", CampainDetailsData[0]["metrics"]["clicks"])
  const cost = Math.round(
    CampainDetailsData[0].metrics.cost_micros / 1_000_000
  );

  const costInfo = (
    <span className="flex items-baseline gap-1">
      <span className="font-semibold">{cost.toLocaleString()}</span>
      <span className="text-[22px] text-muted-foreground">₪</span>
    </span>
  );

  const clickCost = (
    <span className="flex items-baseline gap-1">
      <span className="font-semibold">{(CampainDetailsData[0].metrics.average_cpc / 1_000_000).toLocaleString()}</span>
      <span className="text-[22px] text-muted-foreground">₪</span>
    </span>
  );


  const clickPer = (
    <span className="flex items-baseline gap-1">
      <span className="font-semibold">{(CampainDetailsData[0].metrics.ctr * 100).toLocaleString()}</span>
      <span className="text-[22px] text-muted-foreground">%</span>
    </span>
  );


  const items = [
    { info: CampainDetailsData[0]["metrics"]["clicks"].toLocaleString(), desc: 'קליקים' },
    {
      info: costInfo, desc: 'עלות כוללת'
    },
    { info: CampainDetailsData[0]["metrics"]["impressions"].toLocaleString(), desc: 'הופעות' },
    { info: CampainDetailsData[0]["metrics"]["conversions"].toLocaleString(), desc: 'המרות', },
    { info: clickCost, desc: 'עלות ממוצעת לקליק' },
    { info: clickPer, desc: 'אחוז הקלקות (ctr)' },
  ];

  const qubesColors = [
    "#E0F2FE", // 0: כחול רך (צפיות)
    "#F3E8FF", // 1: סגול רך (ביצועים)
    "#FEF3C7", // 2: צהוב רך (מעורבות)
    "#D1FAE5", // 3: ירוק רך (צמיחה/מנויים)
    "#F3F4F6", // 4: אפור רך (קהל/סטרימינג)
    "#FCE7F6", // 5: ורוד רך (קהילה/חברתי)
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

export { CampainStatisticQuebs };
