import { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';

function TaskModal({ task, onSubmit, onClose }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setStatus(task.status || 'Pending');
      setPriority(task.priority || 'Medium');
      setDueDate(task.dueDate ? task.dueDate.split('T')[0] : '');
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setIsSubmitting(true);
    try {
      await onSubmit(task._id, {
        title: title.trim(),
        description: description.trim(),
        status,
        priority,
        dueDate: dueDate || undefined,
      });
    } catch {
      // Error handled by parent
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const inputStyles =
    'w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm';
  const selectStyles =
    'w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm appearance-none cursor-pointer';

  return (
    <div
      id="task-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-slate-800 border border-slate-700 rounded-xl max-w-lg w-full p-6 shadow-2xl shadow-black/30 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Edit Task</h2>
          <button
            id="task-modal-close"
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:text-slate-300 hover:bg-slate-700/50 rounded-lg transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} id="task-edit-form" className="space-y-4">
          <div>
            <label htmlFor="edit-task-title" className="block text-sm font-medium text-slate-300 mb-1.5">
              Title <span className="text-red-400">*</span>
            </label>
            <input
              id="edit-task-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              required
              className={inputStyles}
            />
          </div>

          <div>
            <label htmlFor="edit-task-description" className="block text-sm font-medium text-slate-300 mb-1.5">
              Description
            </label>
            <textarea
              id="edit-task-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description (optional)"
              rows={3}
              className={`${inputStyles} resize-none`}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="edit-task-status" className="block text-sm font-medium text-slate-300 mb-1.5">
                Status
              </label>
              <select
                id="edit-task-status"
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
              <label htmlFor="edit-task-priority" className="block text-sm font-medium text-slate-300 mb-1.5">
                Priority
              </label>
              <select
                id="edit-task-priority"
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
              <label htmlFor="edit-task-due-date" className="block text-sm font-medium text-slate-300 mb-1.5">
                Due Date
              </label>
              <input
                id="edit-task-due-date"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className={`${inputStyles} [color-scheme:dark]`}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              id="task-modal-cancel"
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-slate-400 hover:text-slate-300 hover:bg-slate-700/50 rounded-lg transition-all text-sm font-medium"
            >
              Cancel
            </button>
            <button
              id="task-modal-submit"
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
            >
              <Save className="w-4 h-4" />
              {isSubmitting ? 'Updating...' : 'Update Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;
