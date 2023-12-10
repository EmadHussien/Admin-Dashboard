import Chart from "../../components/Chart/Chart";
import FeaturedInfo from "../../components/FeaturedInfo/FeaturedInfo";
import "./Home.css";
import WidgetSm from "../../components/WidgetSm/WidgetSm";
import WidgetLg from "../../components/WidgetLg/WidgetLg";
import { useEffect, useMemo, useState } from "react";
import useUserRequests from "../../Utils/useUserRequests";

export default function Home() {
  const { userRequests } = useUserRequests();
  const [latestUsers, setLatestUsers] = useState([]);
  const [latestOrders, setLatestOrders] = useState([]);
  const [userStats, setUserStats] = useState([]);

  const Months = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });

    async function fetchData() {
      try {
        // Use Promise.all to run both requests concurrently
        const [usersResponse, ordersResponse, userStatsResponse] =
          await Promise.all([
            userRequests.get("/users?new=true", { withCredentials: true }),
            userRequests.get("/orders", { withCredentials: true }),
            userRequests.get("/users/stats", { withCredentials: true }),
          ]);

        // Extract data from responses
        const usersData = usersResponse.data;
        const ordersData = ordersResponse.data.slice(-6);
        const userStatsData = userStatsResponse.data;

        // Update state
        setLatestUsers(usersData);
        setLatestOrders(ordersData);
        userStatsData.map((item) => {
          setUserStats((prev) => [
            ...prev,
            { name: Months[item.month - 1], "Active Users": item.totalUsers },
          ]);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="home-container">
      <FeaturedInfo />
      <Chart
        data={userStats}
        datakey={"Active Users"}
        title={"User Analytics"}
        grid={true}
      />
      <div className="home-widgets">
        <WidgetSm usersData={latestUsers} />
        <WidgetLg ordersData={latestOrders} />
      </div>
    </div>
  );
}
