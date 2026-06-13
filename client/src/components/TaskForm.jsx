import { useState } from 'react';
import { Plus, X } from 'lucide-react';

function TaskForm({ onSubmit, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setIsSubmitting(true);
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        status,
        priority,
        dueDate: dueDate || undefined,
      });
      setTitle('');
      setDescription('');
      setStatus('Pending');
      setPriority('Medium');
      setDueDate('');
    } catch {
      // Error handled by parent
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyles =
    'w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm';
  const selectStyles =
    'w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm appearance-none cursor-pointer';

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 shadow-lg shadow-black/10 animate-slide-up">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-white">New Task</h2>
        {onCancel && (
          <button
            id="task-form-cancel"
            onClick={onCancel}
            className="p-1.5 text-slate-500 hover:text-slate-300 hover:bg-slate-700/50 rounded-lg transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} id="task-create-form" className="space-y-4">
        <div>
          <label htmlFor="task-title" className="block text-sm font-medium text-slate-300 mb-1.5">
            Title <span className="text-red-400">*</span>
          </label>
          <input
            id="task-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            required
            className={inputStyles}
          />
        </div>

        <div>
          <label htmlFor="task-description" className="block text-sm font-medium text-slate-300 mb-1.5">
            Description
          </label>
          <textarea
            id="task-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description (optional)"
            rows={3}
            className={`${inputStyles} resize-none`}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="task-status" className="block text-sm font-medium text-slate-300 mb-1.5">
              Status
            </label>
            <select
              id="task-status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={selectStyles}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div>
            <label htmlFor="task-priority" className="block text-sm font-medium text-slate-300 mb-1.5">
              Priority
            </label>
            <select
              id="task-priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className={selectStyles}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label htmlFor="task-due-date" className="block text-sm font-medium text-slate-300 mb-1.5">
              Due Date
            </label>
            <input
              id="task-due-date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className={`${inputStyles} [color-scheme:dark]`}
            />
          </div>
        </div>

        <button
          id="task-create-submit"
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4" />
          {isSubmitting ? 'Creating...' : 'Create Task'}
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
