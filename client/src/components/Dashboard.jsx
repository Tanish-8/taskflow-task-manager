import { ListTodo, Clock, CheckCircle, TrendingUp, PlayCircle } from 'lucide-react';
function Dashboard({ stats }) {
  const cards = [
    {
      id: 'stat-total',
      label: 'Total Tasks',
      value: stats?.total ?? 0,
      icon: ListTodo,
      borderColor: 'border-l-indigo-500',
      bgAccent: 'bg-indigo-500/10',
      iconColor: 'text-indigo-400',
      valueColor: 'text-indigo-400',
    },
    {
      id: 'stat-pending',
      label: 'Pending',
      value: stats?.pending ?? 0,
      icon: Clock,
      borderColor: 'border-l-amber-500',
      bgAccent: 'bg-amber-500/10',
      iconColor: 'text-amber-400',
      valueColor: 'text-amber-400',
    },
{
  id: 'stat-in-progress',
  label: 'In Progress',
  value: stats?.inProgress ?? 0,
  icon: PlayCircle,
  borderColor: 'border-l-blue-500',
  bgAccent: 'bg-blue-500/10',
  iconColor: 'text-blue-400',
  valueColor: 'text-blue-400',
},
    {
      id: 'stat-completed',
      label: 'Completed',
      value: stats?.completed ?? 0,
      icon: CheckCircle,
      borderColor: 'border-l-emerald-500',
      bgAccent: 'bg-emerald-500/10',
      iconColor: 'text-emerald-400',
      valueColor: 'text-emerald-400',
    },
{
  id: 'stat-overdue',
  label: 'Overdue',
  value: stats?.overdue ?? 0,
  icon: Clock,
  borderColor: 'border-l-red-500',
  bgAccent: 'bg-red-500/10',
  iconColor: 'text-red-400',
  valueColor: 'text-red-400',
},
    {
      id: 'stat-completion-rate',
      label: 'Completion Rate',
      value: `${stats?.completionPercentage ?? 0}%`,
      icon: TrendingUp,
      borderColor: 'border-l-violet-500',
      bgAccent: 'bg-violet-500/10',
      iconColor: 'text-violet-400',
      valueColor: 'text-violet-400',
      showProgress: true,
      progressValue: stats?.completionPercentage ?? 0,
    },
  ];

  return (
    <section aria-label="Dashboard Statistics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <article
            key={card.id}
            id={card.id}
            className={`bg-slate-800 border border-slate-700 border-l-4 ${card.borderColor} rounded-lg p-6 shadow-lg shadow-black/10 transition-all hover:shadow-xl hover:shadow-black/15`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-400">{card.label}</span>
              <div className={`w-10 h-10 ${card.bgAccent} rounded-lg flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${card.iconColor}`} />
              </div>
            </div>
            <p className={`text-3xl font-bold ${card.valueColor}`}>{card.value}</p>
            {card.showProgress && (
              <div className="mt-3 w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-violet-500 rounded-full transition-all duration-500"
                  style={{ width: `${card.progressValue}%` }}
                />
              </div>
            )}
          </article>
        );
      })}
    </section>
  );
}

export default Dashboard;
