import { useState, useEffect, useCallback } from 'react';
import { useAuth, api } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Dashboard from '../components/Dashboard';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import { Plus, Filter, Loader2, ClipboardList, Search } from 'lucide-react';

function Home() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('Newest');
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const [tasksRes, statsRes] = await Promise.all([
        api.get('/api/tasks'),
        api.get('/api/tasks/stats'),
      ]);
      setTasks(tasksRes.data);
      setStats(statsRes.data);
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreateTask = async (taskData) => {
    await api.post('/api/tasks', taskData);
    setShowForm(false);
    await fetchData();
  };

  const handleUpdateTask = async (id, taskData) => {
    await api.put(`/api/tasks/${id}`, taskData);
    setEditingTask(null);
    await fetchData();
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    await api.delete(`/api/tasks/${id}`);
    await fetchData();
  };

  // Filter and search tasks
  const filteredTasks = tasks
  .filter((task) => {
    if (filterStatus !== 'All' && task.status !== filterStatus) return false;
    if (filterPriority !== 'All' && task.priority !== filterPriority) return false;
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const titleMatch = task.title.toLowerCase().includes(term);
      const descMatch = (task.description || '').toLowerCase().includes(term);
      if (!titleMatch && !descMatch) return false;
    }
     return true;
})
.sort((a, b) => {
  if (sortBy === 'Newest')
    return new Date(b.createdAt) - new Date(a.createdAt);

  if (sortBy === 'Oldest')
    return new Date(a.createdAt) - new Date(b.createdAt);

  return 0;
});

  const selectStyles =
    'px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all appearance-none cursor-pointer';

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar user={user} onLogout={logout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Stats */}
        <section className="mb-8 animate-fade-in">
          <Dashboard stats={stats} />
        </section>

        {/* Actions Bar */}
        <section className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 flex-wrap">
            {/* Search input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
              <input
                id="search-tasks"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tasks..."
                aria-label="Search tasks"
                className="pl-9 pr-3 py-2 w-48 sm:w-56 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-500" />
              <span className="text-sm text-slate-400 font-medium">Filters:</span>
            </div>
            <select
              id="filter-status"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={selectStyles}
              aria-label="Filter by status"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <select
              id="filter-priority"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className={selectStyles}
              aria-label="Filter by priority"
            >
	    
              <option value="All">All Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
<select
  id="sort-tasks"
  value={sortBy}
  onChange={(e) => setSortBy(e.target.value)}
  className={selectStyles}
  aria-label="Sort tasks"
>
  <option value="Newest">Newest First</option>
  <option value="Oldest">Oldest First</option>
</select>
          </div>

          <button
            id="add-task-toggle"
            onClick={() => setShowForm(!showForm)}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-all flex items-center gap-2 text-sm shadow-lg shadow-indigo-600/20"
          >
            <Plus className="w-4 h-4" />
            {showForm ? 'Cancel' : 'Add New Task'}
          </button>
        </section>

        {/* Task Form */}
        {showForm && (
          <section className="mb-8">
            <TaskForm onSubmit={handleCreateTask} onCancel={() => setShowForm(false)} />
          </section>
        )}

        {/* Task List */}
        <section aria-label="Tasks">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="text-center py-20 animate-fade-in">
              <ClipboardList className="w-16 h-16 text-slate-700 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-400 mb-2">No tasks found</h3>
              <p className="text-slate-500 text-sm">
                {tasks.length === 0
                  ? 'Create your first task to get started.'
                  : 'Try adjusting your search or filters.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={setEditingTask}
                  onDelete={handleDeleteTask}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Edit Modal */}
      {editingTask && (
        <TaskModal
          task={editingTask}
          onSubmit={handleUpdateTask}
          onClose={() => setEditingTask(null)}
        />
      )}
    </div>
  );
}

export default Home;
