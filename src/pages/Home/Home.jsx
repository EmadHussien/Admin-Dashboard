import Chart from "../../components/Chart/Chart";
import FeaturedInfo from "../../components/FeaturedInfo/FeaturedInfo";
import "./Home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/WidgetSm/WidgetSm";
import WidgetLg from "../../components/WidgetLg/WidgetLg";

export default function Home() {
  return (
    <div className="home-container">
      <FeaturedInfo />
      <Chart
        data={userData}
        datakey={"Active Users"}
        title={"User Analytics"}
        grid={true}
      />
      <div className="home-widgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
