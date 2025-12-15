import { Fragment } from "react";
import { Container } from "@/components/common/container";
import { Toolbar, ToolbarActions, ToolbarHeading } from "@/layouts/demo1/components/toolbar";
import { DateRangePicker } from "../../components/DateRangePicker";

export function CampainTitleHeader({ name, info }) {
  const buildInfo = (info) =>
    info.map((item, index) => {
      const Icon = item.icon;
      return (
        <div key={index} className="flex gap-1 items-center ml-[20px]">
          {Icon && <Icon size={16} className="text-muted-foreground" />}
          <span className="font-medium">{item.label}</span>
        </div>
      );
    });

  return (
    <Fragment>
      <Container>
        <Toolbar>
          <ToolbarHeading title={name} description={buildInfo(info)} />
          <ToolbarActions>
            <DateRangePicker />
          </ToolbarActions>
        </Toolbar>
      </Container>
    </Fragment>
  );
}
