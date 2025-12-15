import { useEffect, useState } from 'react';
import { CardCampaign, CardCampaignRow } from '@/partials/cards';
import { LayoutGrid, List, SquarePlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import campains_json from '../../../../../data/campains_json';
import { useCampainStore } from '../../../../../store/campains.store';

export function CampaignsContent({ mode }) {
  const [currentMode, setCurrentMode] = useState(mode);
  const { campains, isLoading, error, fetchPosts } = useCampainStore();

  // טוען את הפוסטים בפעם הראשונה שהעמוד נטען
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
  }, [campains]);

  if (isLoading) {
    return <div className="p-5">טוען פוסטים...</div>;
  }

  if (error) {
    return <div className="p-5 text-danger">שגיאה: {error}</div>;
  }

  const items = [
    {
      logo: 'google-analytics.svg',
      logoSize: '50px',
      title: 'Urban Dreams',
      description: 'Live Gaming Spectacle Unveiled',
      status: {
        variant: 'success',
        label: 'Completed',
      },
      statistics: [
        {
          total: '50.79%',
          description: 'Traffic Up',
        },
        {
          total: '20.1k',
          description: 'New Fans',
        },
        {
          total: '$100k',
          description: 'Donated',
        },
      ],

      progress: {
        variant: 'bg-green-500',
        value: 100,
      },
    },
    {
      logo: 'google-analytics-2',
      logoSize: '50px',
      title: 'Photo Promotion',
      description: 'Visual Stories Unleashed Worldwide',
      status: {
        variant: 'primary',
        label: 'Running',
      },
      statistics: [
        {
          total: '25k',
          description: 'Link Hits',
        },
        {
          total: '32.9%',
          description: 'Engage Uptick',
        },
        {
          total: '$7,5k',
          description: 'Earnings',
        },
      ],

      progress: {
        variant: 'bg-primary',
        value: 60,
      },
    },
    {
      logo: 'youtube.svg',
      logoSize: '50px',
      title: 'Video Viral',
      description: 'Video Content Showcase Spotlighted',
      status: {
        variant: 'primary',
        label: 'Running',
      },
      statistics: [
        {
          total: '12M',
          description: 'Video Plays',
        },
        {
          total: '40%',
          description: 'Sub Gain',
        },
        {
          total: '25k',
          description: 'Link Hits',
        },
      ],

      progress: {
        variant: 'bg-primary',
        value: 55,
      },
    },
    {
      logo: 'amazon-2.svg',
      logoDark: 'amazon-dark.svg',
      logoSize: '50px',
      title: 'Product Push',
      description: 'Prime Shopping Bliss Delivered',
      status: {
        variant: 'success',
        label: 'Completed',
      },
      statistics: [
        {
          total: '50%',
          description: 'Traffic Rise',
        },
        {
          total: '$34,9k',
          description: 'Product Sales',
        },
        {
          total: '10k',
          description: 'Actions',
        },
      ],

      progress: {
        variant: 'bg-green-500',
        value: 100,
      },
    },
    {
      logo: 'mailchimp-1.svg',
      logoSize: '50px',
      title: 'Email Engagement',
      description: 'Email Engagement Power Unleashed',
      status: {
        variant: 'secondary',
        label: 'Upcoming',
      },
      statistics: [
        {
          total: '24.3k',
          description: 'Subscribers',
        },
        {
          total: '34.8%',
          description: 'Traffic Rise',
        },
        {
          total: '$20,5k',
          description: 'Total Sales',
        },
      ],

      progress: {
        variant: 'bg-input',
        value: 100,
      },
    },
    {
      logo: 'linkedin.svg',
      logoSize: '50px',
      title: 'Career Boost',
      description: 'Pro Connections Empowered Globally',
      status: {
        variant: 'primary',
        label: 'Running',
      },
      statistics: [
        {
          total: '9.1k',
          description: 'Suvey Inputs',
        },
        {
          total: '834',
          description: 'Influencer Tie-ins',
        },
        {
          total: '70k',
          description: 'Impressions',
        },
      ],

      progress: {
        variant: 'bg-primary',
        value: 30,
      },
    },
  ];

  const calculateStatus = (status) => {
    if (status == 0) return { variant: 'bg-input', label: 'לא מוגדר' };
    if (status == 1) return { variant: 'secondary', label: 'לא ידוע' };
    if (status == 2) return { variant: 'bg-primary', label: 'מופעל' };
    if (status == 3) return { variant: 'bg-green-500', label: 'מושהה' };
    if (status == 4) return { variant: 'bg-red-500', label: 'הוסר' };
  };

  const renderProject = (data, index) => {
    let progress = {
      variant: 'bg-primary',
      value: 0,
    };

    let statistic = [
      {
        total: data['metrics']['clicks'],
        description: 'קליקים',
      },
      {
        total: data['metrics']['impressions'],
        description: 'צפיות',
      },
      {
        total: data['metrics']['conversions'],
        description: 'המרות',
      },
    ];
    let status = calculateStatus(data['campaign']['status']);
    return (
      // <CardCampaign
      //   logo="google-analytics-2.svg"
      //   logoSize="50px"
      //   title={item.title}
      //   description={item.description}
      //   status={item.status}
      //   statistics={statistic}
      //   progress={progress}
      //   url="#"
      //   key={index}
      // />

      <CardCampaign
        logo="ads.png"
        logoSize="70px"
        title={data['campaign']['name']}
        description={data['campaign']['name']}
        status={status}
        statistics={statistic}
        progress={progress}
        url="#"
        key={index}
      />
    );
  };

  const renderItem = (data, index) => {
    let progress = {
      variant: 'bg-primary',
      value: 30,
    };

    let statistic = [
      {
        total: data['metrics']['clicks'],
        description: 'קליקים',
      },
      {
        total: data['metrics']['impressions'],
        description: 'צפיות',
      },
      {
        total: data['metrics']['conversions'],
        description: 'המרות',
      },
    ];

    let status = calculateStatus(data['campaign']['status']);

    return (
      <CardCampaignRow
        logo="ads.png"
        logoSize="40px"
        title={data['campaign']['name']}
        description={data['campaign']['name']}
        status={status}
        statistics={statistic}
        url="#"
        key={index}
      />
    );
  };

  return (
    <div className="flex flex-col items-stretch gap-5 lg:gap-7.5">
      <div className="flex flex-wrap items-center gap-5 justify-between">
        <h3 className="text-lg text-mono font-semibold">
          {items.length} Campaigns
        </h3>
        <div className="flex gap-4">
          <ToggleGroup
            type="single"
            variant="outline"
            value={currentMode}
            onValueChange={(value) => {
              if (value) setCurrentMode(value);
            }}
          >
            <ToggleGroupItem value="cards">
              <LayoutGrid size={16} />
            </ToggleGroupItem>
            <ToggleGroupItem value="list">
              <List size={16} />
            </ToggleGroupItem>
          </ToggleGroup>
          <Button size="md" className="bg-green-500">
            <SquarePlus /> New Campaign
          </Button>
        </div>
      </div>
      {currentMode === 'cards' && (
        <div id="campaigns_cards">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-7.5">
            {campains_json.map((item, index) => {
              return renderProject(item, index);
            })}
          </div>
          <div className="flex grow justify-center pt-5 lg:pt-7.5">
            <Button mode="link" underlined="dashed" asChild>
              <Link to="/account/integrations">Show more Campaigns</Link>
            </Button>
          </div>
        </div>
      )}
      {currentMode === 'list' && (
        <div id="campaigns_list">
          <div className="flex flex-col gap-5 lg:gap-7.5">
            {campains_json.map((data, index) => {
              return renderItem(data, index);
            })}
          </div>
          <div className="flex grow justify-center pt-5 lg:pt-7.5">
            <Button mode="link" underlined="dashed" asChild>
              <Link to="/account/integrations">Show more Campaigns</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
