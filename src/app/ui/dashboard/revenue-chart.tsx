import { generateYAxis } from '@/app/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { fetchRevenue } from '@/app/lib/data';

export default async function RevenueChart() {
  const revenue = await fetchRevenue();

  const chartHeight = 350;
  const { yAxisLabels, topLabel } = generateYAxis(revenue);

  if (!revenue || revenue.length === 0) {
    return <p>No data available.</p>;
  }

  return (
    <section>
      <h2>Recent Revenue</h2>

      <div>
        {/* y-axis */}
        <div>
          {yAxisLabels.map((label) => (
            <p key={label}>{label}</p>
          ))}
        </div>

        {revenue.map((month) => (
          <div key={month.month}>
            {/* bar */}
            <div
              style={{
                height: `${(chartHeight / topLabel) * month.revenue}px`,
              }}
            ></div>
            {/* x-axis */}
            <p>{month.month}</p>
          </div>
        ))}
      </div>

      <footer>
        <CalendarIcon />
        <h3>Last 12 months</h3>
      </footer>
    </section>
  );
}