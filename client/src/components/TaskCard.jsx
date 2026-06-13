import { Calendar, Pencil, Trash2 } from 'lucide-react';

const priorityStyles = {
  High: 'bg-red-500/15 text-red-400 border border-red-500/30',
  Medium: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
  Low: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
};

const statusStyles = {
  Pending: 'bg-blue-500/15 text-blue-400 border border-blue-500/30',
  'In Progress': 'bg-violet-500/15 text-violet-400 border border-violet-500/30',
  Completed: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
};

function formatDate(dateStr) {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function isOverdue(dateStr) {
  if (!dateStr) return false;
  return new Date(dateStr) < new Date() && dateStr;
}

function TaskCard({ task, onEdit, onDelete }) {
  const overdue = isOverdue(task.dueDate) && task.status !== 'Completed';
const daysLate = overdue
  ? Math.floor(
      (new Date() - new Date(task.dueDate)) /
      (1000 * 60 * 60 * 24)
    )
  : 0;

  return (
    <article
      id={`task-card-${task._id}`}
      className={`bg-slate-800 border rounded-lg p-5 shadow-lg shadow-black/10 transition-all animate-fade-in group ${
  overdue
    ? 'border-red-500/40 hover:border-red-400'
    : 'border-slate-700 hover:border-slate-600'
}`}
    >
      {/* Top: Title + Priority */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-white font-semibold text-base leading-snug flex-1 min-w-0 truncate">
          {task.title}
        </h3>
        <div className="flex items-center gap-2 shrink-0">
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityStyles[task.priority] || ''}`}>
    {task.priority}
  </span>

  {overdue && (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/15 text-red-400 border border-red-500/30">
      Overdue
    </span>
  )}
</div>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
          {task.description}
        </p>
      )}

      {/* Bottom row */}
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-700/50">
        <div className="flex items-center gap-3 flex-wrap min-w-0">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[task.status] || ''}`}>
            {task.status}
          </span>
          {task.dueDate && (
  <div className="flex flex-col">
    <span
      className={`inline-flex items-center gap-1.5 text-xs ${
        overdue ? 'text-red-400' : 'text-slate-500'
      }`}
    >
      <Calendar className="w-3.5 h-3.5" />
      {formatDate(task.dueDate)}
    </span>

    {overdue && (
      <span className="text-red-400 text-xs mt-1">
        Overdue by {daysLate} day{daysLate !== 1 ? 's' : ''}
      </span>
    )}
  </div>
)}
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            id={`task-edit-${task._id}`}
            onClick={() => onEdit(task)}
            className="p-2 text-slate-500 hover:text-indigo-400 hover:bg-slate-700/50 rounded-lg transition-all"
            aria-label={`Edit task ${task.title}`}
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            id={`task-delete-${task._id}`}
            onClick={() => onDelete(task._id)}
            className="p-2 text-slate-500 hover:text-red-400 hover:bg-slate-700/50 rounded-lg transition-all"
            aria-label={`Delete task ${task.title}`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default TaskCard;
