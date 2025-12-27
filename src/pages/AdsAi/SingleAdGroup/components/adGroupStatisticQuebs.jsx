import { Fragment, useEffect, useState } from 'react';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Card, CardContent } from '@/components/ui/card';
import { useParams } from 'react-router-dom';
import { useCampaignsStore } from '../../store/useCampaignsStore';

const AdGroupStatisticQuebs = () => {
  const { adGroupId } = useParams();
  const { date, getAdGroupInfoById } = useCampaignsStore();
  const [infoData, setInfoData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (adGroupId) {
      setLoading(true);
      getAdGroupInfoById({
        startDate: date.from,
        endDate: date.to,
        adGroupId: adGroupId,
      })
        .then((data) => {
          setInfoData(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [adGroupId, date.from, date.to, getAdGroupInfoById]);

  // infoData is expected to be an array or object containing metrics
  const displayData = Array.isArray(infoData) ? infoData[0] : infoData;
  const metrics = displayData?.metrics || {};

  const cost = Math.round(
    (metrics.cost_micros || 0) / 1_000_000
  );

  const costInfo = (
    <span className="flex items-baseline gap-1">
      <span className="font-semibold">{cost.toLocaleString()}</span>
      <span className="text-[22px] text-muted-foreground">₪</span>
    </span>
  );

  const avgCpc = metrics.average_cpc || (metrics.clicks > 0 ? metrics.cost_micros / metrics.clicks : 0);

  const clickCost = (
    <span className="flex items-baseline gap-1">
      <span className="font-semibold">{(avgCpc / 1_000_000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
      <span className="text-[22px] text-muted-foreground">₪</span>
    </span>
  );

  const ctrValue = metrics.ctr || (metrics.impressions > 0 ? (metrics.clicks / metrics.impressions) : 0);

  const clickPer = (
    <span className="flex items-baseline gap-1">
      <span className="font-semibold">{(ctrValue * 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
      <span className="text-[22px] text-muted-foreground">%</span>
    </span>
  );

  const items = [
    { info: (metrics.clicks || 0).toLocaleString(), desc: 'קליקים' },
    { info: costInfo, desc: 'עלות כוללת' },
    { info: (metrics.impressions || 0).toLocaleString(), desc: 'הופעות' },
    { info: (metrics.conversions || 0).toLocaleString(), desc: 'המרות', },
    { info: clickCost, desc: 'עלות ממוצעת לקליק' },
    { info: clickPer, desc: 'אחוז הקלקות (ctr)' },
  ];

  const qubesColors = [
    "#E0F2FE", // 0: כחול רך
    "#F3E8FF", // 1: סגול רך
    "#FEF3C7", // 2: צהוב רך
    "#D1FAE5", // 3: ירוק רך
    "#F3F4F6", // 4: אפור רך
    "#FCE7F6", // 5: ורוד רך
  ];

  const renderItem = (item, index) => {
    return (
      <Card key={index}>
        <CardContent className="p-0 pt-3 flex flex-col justify-between gap-6 h-full bg-cover rtl:bg-[left_top_-1.7rem] bg-[right_top_-1.7rem] bg-no-repeat channel-stats-bg" style={{ backgroundColor: qubesColors[index] }}>
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

  if (loading) return <div className="col-span-6 text-center py-4">טוען סטטיסטיקה...</div>;

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

export { AdGroupStatisticQuebs };

