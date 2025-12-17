import { Fragment } from 'react';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Card, CardContent } from '@/components/ui/card';


const StatisticQuebs = () => {
  const costInfo = (
    <span className="flex items-baseline gap-1">
      <span className="font-semibold">1435.76</span>
      <span className="text-[22px] text-muted-foreground">₪</span>
    </span>
  );

  const clickCost = (
    <span className="flex items-baseline gap-1">
      <span className="font-semibold">148</span>
      <span className="text-[22px] text-muted-foreground">₪</span>
    </span>
  );


  const clickPer = (
    <span className="flex items-baseline gap-1">
      <span className="font-semibold">6789</span>
      <span className="text-[22px] text-muted-foreground">%</span>
    </span>
  );


  const items = [
    { info: "1234", desc: 'קליקים' },
    {
      info: "3344", desc: 'עלות כוללת'
    },
    { info: "6674", desc: 'הופעות' },
    { info: "4543", desc: 'המרות', },
    { info: "343232", desc: 'עלות ממוצעת לקליק' },
    { info: "546564", desc: 'אחוז הקלקות (ctr)' },
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
