import React, { useState, useMemo, useEffect } from 'react';
import { 
  Users, 
  LayoutDashboard, 
  Calculator, 
  Settings, 
  LogOut, 
  Search, 
  Plus, 
  Download,
  Filter,
  Check,
  X,
  Grid,
  Edit,
  Trash2,
  ChevronDown,
  ChevronUp,
  Save,
  FileText,
  AlertCircle
} from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Major, 
  Student, 
  Room, 
  ExamSession, 
  User,
  Section
} from './types';
import { MAJORS, DEFAULT_EXAM_SESSIONS, INITIAL_ROOMS } from './constants';
import { formatCurrency, generateStudentId, cn } from './lib/utils';
import { exportStudentsToPDF, exportRoomPlanToPDF } from './utils/pdf';

// --- Constants ---
const TOTAL_TUITION = 600000;

// --- Components ---

const LoginPage = ({ onLogin }: { onLogin: (user: User) => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      onLogin({ id: '1', username: 'Administrateur', role: 'admin', permissions: ['all'] });
    } else if (username === 'staff' && password === 'staff') {
      onLogin({ id: '2', username: 'Comptable', role: 'staff', permissions: ['accounting', 'students'] });
    } else {
      toast.error('Identifiants incorrects');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md p-10 bg-white rounded-3xl shadow-2xl border border-slate-200"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-blue-200">
            <Calculator className="text-white w-10 h-10" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 text-center tracking-tight">UnivGestion Pro</h1>
          <p className="text-slate-500 font-medium">Gestion Comptable & Académique</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Identifiant</label>
            <div className="relative">
              <input 
                type="text" 
                className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin / staff"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Mot de passe</label>
            <input 
              type="password" 
              className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-200 active:scale-95">
            Se connecter
          </button>
        </form>
      </motion.div>
    </div>
  );
};

const Sidebar = ({ activeTab, setActiveTab, user, onLogout }: { activeTab: string, setActiveTab: (t: string) => void, user: User, onLogout: () => void }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'accounting', label: 'Comptabilité', icon: Calculator },
    { id: 'students', label: 'Étudiants', icon: Users },
    { id: 'rooms', label: 'Plans de salles', icon: Grid },
    { id: 'settings', label: 'Paramètres', icon: Settings },
  ];

  return (
    <div className="w-72 bg-slate-900 h-screen sticky top-0 flex flex-col text-slate-400">
      <div className="p-8 flex items-center gap-4 border-b border-slate-800/50">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
          <Calculator className="text-white w-6 h-6" />
        </div>
        <div>
          <span className="font-black text-white text-xl tracking-tight">UnivApp</span>
          <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Enterprise</p>
        </div>
      </div>
      
      <nav className="flex-1 p-6 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300",
              activeTab === item.id 
                ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20 font-bold" 
                : "hover:bg-slate-800/50 hover:text-white font-medium"
            )}
          >
            <item.icon className={cn("w-5 h-5", activeTab === item.id ? "text-white" : "text-slate-500")} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-800/50">
        <div className="px-5 py-4 bg-slate-800/30 rounded-2xl mb-6">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Utilisateur</p>
          <p className="text-sm font-bold text-white truncate">{user.username}</p>
          <p className="text-[10px] text-blue-500 font-medium capitalize mt-1">{user.role}</p>
        </div>
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-rose-400 hover:bg-rose-500/10 transition-all font-bold"
        >
          <LogOut className="w-5 h-5" />
          <span>Déconnexion</span>
        </button>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('univ_user_pro');
    return saved ? JSON.parse(saved) : null;
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('univ_students_pro');
    if (saved) return JSON.parse(saved);
    return [
      { id: 'CGE 001', name: 'Mekongo Jean', majorId: 'fr-cge', level: 1, payments: { inscription: 50000, tranche1: 200000, tranche2: 0, tranche3: 0, tranche4: 0 }, hasPolo: true, hasLivret: true },
      { id: 'GRH 001', name: 'Atangana Marie', majorId: 'fr-grh', level: 2, payments: { inscription: 50000, tranche1: 200000, tranche2: 200000, tranche3: 150000, tranche4: 0 }, hasPolo: true, hasLivret: true },
      { id: 'DL 001', name: 'Kamga Luc', majorId: 'fr-dl', level: 3, payments: { inscription: 50000, tranche1: 100000, tranche2: 0, tranche3: 0, tranche4: 0 }, hasPolo: false, hasLivret: true },
    ];
  });

  const [rooms, setRooms] = useState<Room[]>(() => {
    const saved = localStorage.getItem('univ_rooms_pro');
    return saved ? JSON.parse(saved) : INITIAL_ROOMS;
  });

  const [examThresholds, setExamThresholds] = useState<{ [key: string]: number }>(() => {
    const saved = localStorage.getItem('univ_thresholds_pro');
    return saved ? JSON.parse(saved) : { 'cc': 30, 'normal': 70, 'rattrapage': 100 };
  });

  useEffect(() => { localStorage.setItem('univ_user_pro', JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem('univ_students_pro', JSON.stringify(students)); }, [students]);
  useEffect(() => { localStorage.setItem('univ_rooms_pro', JSON.stringify(rooms)); }, [rooms]);
  useEffect(() => { localStorage.setItem('univ_thresholds_pro', JSON.stringify(examThresholds)); }, [examThresholds]);

  const handleLogin = (userData: User) => setUser(userData);
  const handleLogout = () => setUser(null);

  const addStudent = (student: Student) => setStudents([...students, student]);
  const updateStudent = (id: string, updates: Partial<Student>) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };
  const deleteStudent = (id: string) => {
    if (confirm('Supprimer cet étudiant ?')) {
      setStudents(prev => prev.filter(s => s.id !== id));
      toast.success('Étudiant supprimé');
    }
  };

  const addRoom = (room: Room) => setRooms([...rooms, room]);
  const deleteRoom = (id: string) => setRooms(rooms.filter(r => r.id !== id));
  const updateRoom = (id: string, updates: Partial<Room>) => {
    setRooms(rooms.map(r => r.id === id ? { ...r, ...updates } : r));
  };

  if (!user) return <><LoginPage onLogin={handleLogin} /><Toaster position="top-right" richColors /></>;

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} user={user} onLogout={handleLogout} />
      <main className="flex-1 p-10 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'dashboard' && <DashboardView students={students} rooms={rooms} />}
            {activeTab === 'accounting' && (
              <AccountingView 
                students={students} 
                updateStudent={updateStudent} 
                addStudent={addStudent}
                deleteStudent={deleteStudent}
              />
            )}
            {activeTab === 'students' && (
              <StudentsView 
                students={students} 
                updateStudent={updateStudent} 
                deleteStudent={deleteStudent} 
              />
            )}
            {activeTab === 'rooms' && (
              <RoomPlannerView 
                students={students} 
                rooms={rooms} 
                examThresholds={examThresholds}
              />
            )}
            {activeTab === 'settings' && (
              <SettingsView 
                examThresholds={examThresholds} 
                setExamThresholds={setExamThresholds}
                rooms={rooms}
                students={students}
                addRoom={addRoom}
                deleteRoom={deleteRoom}
                updateRoom={updateRoom}
                user={user}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
      <Toaster position="top-right" richColors />
    </div>
  );
}

// --- Views ---

const DashboardView = ({ students, rooms }: { students: Student[], rooms: Room[] }) => {
  const totalPaid = students.reduce((sum, s) => sum + Object.values(s.payments).reduce((a, b) => a + b, 0), 0);
  const totalDue = students.length * TOTAL_TUITION;
  const recoveryRate = totalDue > 0 ? (totalPaid / totalDue) * 100 : 0;

  const stats = [
    { label: 'Total Étudiants', value: students.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Recettes Totales', value: formatCurrency(totalPaid), icon: Calculator, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Taux de Recouvrement', value: `${recoveryRate.toFixed(1)}%`, icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Salles de Composition', value: rooms.length, icon: Grid, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Vue d'ensemble</h1>
        <p className="text-slate-500 font-medium mt-2">Bienvenue sur votre portail de gestion universitaire.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div 
            key={i} 
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100"
          >
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6", stat.bg)}>
              <stat.icon className={cn("w-7 h-7", stat.color)} />
            </div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-3xl font-black text-slate-900">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-slate-900">Distribution par Section</h2>
            <div className="p-2 bg-slate-50 rounded-xl"><Filter className="w-5 h-5 text-slate-400" /></div>
          </div>
          <div className="h-64 flex flex-col items-center justify-center">
            <div className="flex gap-4 items-end h-40">
              <div className="w-16 bg-blue-500 rounded-t-xl" style={{ height: '70%' }}></div>
              <div className="w-16 bg-emerald-500 rounded-t-xl" style={{ height: '40%' }}></div>
            </div>
            <div className="flex gap-4 mt-4 font-bold text-xs text-slate-400">
              <span className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded-full"></div> FR</span>
              <span className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-500 rounded-full"></div> EN</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 mb-8">Dernières Activités</h2>
          <div className="space-y-6">
            {students.slice(-4).reverse().map((s, i) => (
              <div key={i} className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600 font-bold group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    {s.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{s.name}</p>
                    <p className="text-xs text-slate-500 font-medium">{s.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-emerald-600">+ Inscription</p>
                  <p className="text-[10px] text-slate-400 font-medium">Il y a 2h</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const AccountingView = ({ 
  students, 
  updateStudent, 
  addStudent,
  deleteStudent 
}: { 
  students: Student[], 
  updateStudent: (id: string, updates: Partial<Student>) => void,
  addStudent: (s: Student) => void,
  deleteStudent: (id: string) => void
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSection, setFilterSection] = useState<Section | 'All'>('All');
  const [showAddForm, setShowAddForm] = useState(false);
  const [sortField, setSortField] = useState<keyof Student>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      const major = MAJORS.find(m => m.id === s.majorId);
      const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSection = filterSection === 'All' || major?.section === filterSection;
      return matchesSearch && matchesSection;
    }).sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return 0;
    });
  }, [students, searchTerm, filterSection, sortField, sortOrder]);

  const handleExport = (type: 'all' | 'paid' | 'insolvent') => {
    let list = filteredStudents;
    let title = "Registre Comptable";
    
    if (type === 'paid') {
      list = filteredStudents.filter(s => Object.values(s.payments).reduce((a, b) => a + b, 0) >= TOTAL_TUITION);
      title = "Liste des Étudiants Solvables";
    } else if (type === 'insolvent') {
      list = filteredStudents.filter(s => Object.values(s.payments).reduce((a, b) => a + b, 0) < TOTAL_TUITION);
      title = "Liste des Étudiants Insolvables";
    }
    
    exportStudentsToPDF(list, MAJORS, title);
    toast.success(`PDF ${title} généré`);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Comptabilité</h1>
          <p className="text-slate-500 font-medium mt-2">Interface de gestion financière style Excel.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex bg-white rounded-2xl shadow-sm border border-slate-200 p-1">
            <button onClick={() => handleExport('all')} className="px-4 py-2 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-600 flex items-center gap-2">
              <Download className="w-3 h-3" /> Tous
            </button>
            <button onClick={() => handleExport('paid')} className="px-4 py-2 hover:bg-emerald-50 rounded-xl text-xs font-bold text-emerald-600 flex items-center gap-2">
              <Check className="w-3 h-3" /> Solvables
            </button>
            <button onClick={() => handleExport('insolvent')} className="px-4 py-2 hover:bg-rose-50 rounded-xl text-xs font-bold text-rose-600 flex items-center gap-2">
              <AlertCircle className="w-3 h-3" /> Insolvables
            </button>
          </div>
          <button 
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-3 px-6 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all font-bold shadow-xl shadow-blue-200 active:scale-95"
          >
            <Plus className="w-5 h-5" /> Inscrire
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-wrap items-center gap-6 bg-slate-50/50">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Rechercher un étudiant ou un matricule..."
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-medium text-sm transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="px-6 py-4 bg-white border border-slate-200 rounded-2xl outline-none font-bold text-sm text-slate-700 appearance-none cursor-pointer hover:bg-slate-50 transition-colors"
            value={filterSection}
            onChange={(e) => setFilterSection(e.target.value as Section | 'All')}
          >
            <option value="All">Toutes les sections</option>
            <option value="Francophone">Section Francophone</option>
            <option value="Anglophone">Section Anglophone</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest">
                <th className="px-8 py-5">Matricule</th>
                <th className="px-8 py-5">Nom complet</th>
                <th className="px-8 py-5">Filière</th>
                <th className="px-6 py-5 text-center">Inscription</th>
                <th className="px-6 py-5 text-center">Tranche 1</th>
                <th className="px-6 py-5 text-center">Tranche 2</th>
                <th className="px-6 py-5 text-center">Tranche 3</th>
                <th className="px-6 py-5 text-center">Tranche 4</th>
                <th className="px-8 py-5 text-right">Total Payé</th>
                <th className="px-8 py-5 text-right">Reste</th>
                <th className="px-6 py-5 text-center">Polo</th>
                <th className="px-6 py-5 text-center">Livret</th>
                <th className="px-8 py-5"></th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100 font-medium text-slate-600">
              {filteredStudents.map((s) => {
                const major = MAJORS.find(m => m.id === s.majorId);
                const totalPaid = Object.values(s.payments).reduce((a, b) => a + b, 0);
                const remaining = TOTAL_TUITION - totalPaid;

                return (
                  <tr key={s.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-8 py-5 font-mono font-black text-blue-600 text-xs">{s.id}</td>
                    <td className="px-8 py-5 font-bold text-slate-900 whitespace-nowrap">{s.name}</td>
                    <td className="px-8 py-5"><span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-lg font-bold text-[10px] uppercase">{major?.abbreviation}</span></td>
                    {['inscription', 'tranche1', 'tranche2', 'tranche3', 'tranche4'].map((field) => (
                      <td key={field} className="px-4 py-3">
                        <input 
                          type="number" 
                          className="w-24 px-3 py-2 bg-slate-50 border border-transparent rounded-xl focus:border-blue-500 focus:bg-white outline-none text-right font-bold text-slate-800 transition-all no-spinner"
                          value={s.payments[field as keyof Student['payments']] || 0}
                          onChange={(e) => updateStudent(s.id, {
                            payments: { ...s.payments, [field]: parseInt(e.target.value) || 0 }
                          })}
                        />
                      </td>
                    ))}
                    <td className="px-8 py-5 text-right font-black text-slate-900">{formatCurrency(totalPaid)}</td>
                    <td className={cn("px-8 py-5 text-right font-black", remaining > 0 ? "text-rose-500" : "text-emerald-500")}>
                      {formatCurrency(remaining)}
                    </td>
                    <td className="px-6 py-5 text-center">
                      <button 
                        onClick={() => updateStudent(s.id, { hasPolo: !s.hasPolo })}
                        className={cn("w-8 h-8 rounded-xl border flex items-center justify-center transition-all mx-auto", s.hasPolo ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200" : "border-slate-200 hover:border-blue-300")}
                      >
                        {s.hasPolo && <Check className="w-4 h-4" />}
                      </button>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <button 
                        onClick={() => updateStudent(s.id, { hasLivret: !s.hasLivret })}
                        className={cn("w-8 h-8 rounded-xl border flex items-center justify-center transition-all mx-auto", s.hasLivret ? "bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-200" : "border-slate-200 hover:border-emerald-300")}
                      >
                        {s.hasLivret && <Check className="w-4 h-4" />}
                      </button>
                    </td>
                    <td className="px-8 py-5">
                      <button 
                        onClick={() => deleteStudent(s.id)}
                        className="p-2 text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="bg-slate-50 font-black text-slate-900">
              <tr>
                <td colSpan={8} className="px-8 py-6 text-right uppercase tracking-widest text-xs">Total de la sélection :</td>
                <td className="px-8 py-6 text-right">{formatCurrency(filteredStudents.reduce((sum, s) => sum + Object.values(s.payments).reduce((a, b) => a + b, 0), 0))}</td>
                <td className="px-8 py-6 text-right">{formatCurrency(filteredStudents.reduce((sum, s) => sum + (TOTAL_TUITION - Object.values(s.payments).reduce((a, b) => a + b, 0)), 0))}</td>
                <td colSpan={3}></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {showAddForm && (
        <AddStudentModal 
          onClose={() => setShowAddForm(false)} 
          onAdd={(data) => {
            const major = MAJORS.find(m => m.id === data.majorId);
            const count = students.filter(s => s.majorId === data.majorId).length + 1;
            const matricule = generateStudentId(major?.abbreviation || 'STUD', count);
            
            addStudent({
              id: matricule,
              name: data.name,
              majorId: data.majorId,
              level: data.level,
              payments: { inscription: 0, tranche1: 0, tranche2: 0, tranche3: 0, tranche4: 0 },
              hasPolo: false,
              hasLivret: false
            });
            setShowAddForm(false);
            toast.success(`Étudiant ${data.name} inscrit avec succès.`);
          }}
        />
      )}
    </div>
  );
};

const AddStudentModal = ({ onClose, onAdd }: { onClose: () => void, onAdd: (d: any) => void }) => {
  const [formData, setFormData] = useState({ name: '', majorId: MAJORS[0].id, level: 1 });

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-6">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white w-full max-w-xl p-10 rounded-[2.5rem] shadow-2xl"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black text-slate-900">Nouvelle Inscription</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X className="w-6 h-6 text-slate-400" /></button>
        </div>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Nom complet de l'étudiant</label>
            <input 
              type="text" 
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-slate-800"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ex: Mekongo Jean"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Filière Académique</label>
              <select 
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-slate-800 appearance-none"
                value={formData.majorId}
                onChange={(e) => setFormData({ ...formData, majorId: e.target.value })}
              >
                {MAJORS.map(m => (
                  <option key={m.id} value={m.id}>{m.abbreviation} - {m.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Niveau d'études</label>
              <select 
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-slate-800 appearance-none"
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
              >
                {[1, 2, 3, 4, 5].map(n => (
                  <option key={n} value={n}>Niveau {n}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-4 pt-6">
            <button onClick={onClose} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-colors">Annuler</button>
            <button 
              onClick={() => {
                if (!formData.name.trim()) return toast.error("Le nom est obligatoire");
                onAdd(formData);
              }} 
              className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 shadow-xl shadow-blue-200 active:scale-95 transition-all"
            >
              Enregistrer
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const StudentsView = ({ students, updateStudent, deleteStudent }: any) => {
  const [search, setSearch] = useState('');

  const filtered = students.filter((s: Student) => 
    s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Liste Académique</h1>
          <p className="text-slate-500 font-medium mt-2">Vue détaillée des effectifs par matricule.</p>
        </div>
      </div>
      
      <div className="relative max-w-xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input 
          type="text" 
          placeholder="Filtrer les étudiants..."
          className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm outline-none font-medium"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filtered.map((s: Student) => (
          <motion.div 
            key={s.id} 
            layout
            className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-black text-xl">
                {s.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black rounded-lg uppercase tracking-tighter">Lvl {s.level}</span>
                <span className="text-[10px] font-bold text-slate-400">{MAJORS.find(m => m.id === s.majorId)?.abbreviation}</span>
              </div>
            </div>
            <h4 className="font-black text-slate-900 text-lg leading-tight mb-1 group-hover:text-blue-600 transition-colors">{s.name}</h4>
            <p className="text-xs font-mono font-bold text-slate-400 mb-6">{s.id}</p>
            
            <div className="flex items-center justify-between border-t border-slate-50 pt-6">
              <div className="flex gap-2">
                {s.hasPolo && <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center"><Check className="w-3 h-3" /></div>}
                {s.hasLivret && <div className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center"><FileText className="w-3 h-3" /></div>}
              </div>
              <button 
                onClick={() => deleteStudent(s.id)}
                className="text-slate-300 hover:text-rose-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const RoomPlannerView = ({ 
  students, 
  rooms, 
  examThresholds 
}: { 
  students: Student[], 
  rooms: Room[], 
  examThresholds: any
}) => {
  const [selectedRoomId, setSelectedRoomId] = useState(rooms[0]?.id || '');
  const [selectedSession, setSelectedSession] = useState('cc');
  const [levelGroup, setLevelGroup] = useState<'1&2' | '3&4&5'>('1&2');
  const [plan, setPlan] = useState<(Student | null)[][][]>([]);

  const generatePlan = () => {
    const room = rooms.find(r => r.id === selectedRoomId);
    if (!room) return;

    const threshold = examThresholds[selectedSession];
    
    const eligibleStudents = students.filter(s => {
      const totalPaid = Object.values(s.payments).reduce((a, b) => a + b, 0);
      const percentage = (totalPaid / TOTAL_TUITION) * 100;
      const matchLevel = levelGroup === '1&2' ? (s.level <= 2) : (s.level >= 3);
      return percentage >= threshold && matchLevel;
    }).sort((a, b) => a.name.localeCompare(b.name));

    if (eligibleStudents.length === 0) {
      toast.error("Aucun étudiant n'est éligible pour cette session avec ces critères.");
      setPlan([]);
      return;
    }

    const newPlan: (Student | null)[][][] = [];
    let pool = [...eligibleStudents];
    
    for (let r = 0; r < room.rows; r++) {
      const row: (Student | null)[][] = [];
      for (let c = 0; c < room.cols; c++) {
        const bench: (Student | null)[] = [null, null];
        
        if (pool.length > 0) {
          bench[0] = pool.shift() || null;
        }

        if (pool.length > 0 && bench[0]) {
          const differentMajorIndex = pool.findIndex(s => s.majorId !== bench[0]?.majorId);
          if (differentMajorIndex !== -1) {
            bench[1] = pool.splice(differentMajorIndex, 1)[0];
          } else {
            bench[1] = pool.shift() || null;
          }
        } else if (pool.length > 0) {
          bench[1] = pool.shift() || null;
        }

        row.push(bench);
      }
      newPlan.push(row);
    }

    setPlan(newPlan);
    toast.success("Plan de salle généré automatiquement.");
  };

  const handleExportPDF = () => {
    const room = rooms.find(r => r.id === selectedRoomId);
    if (!room || plan.length === 0) return;
    exportRoomPlanToPDF(room.name, plan, `Plan de composition - ${selectedSession.toUpperCase()}`);
    toast.success("PDF du plan exporté.");
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Plan de Salles</h1>
          <p className="text-slate-500 font-medium mt-2">Génération de positionnements par session d'examen.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleExportPDF}
            disabled={plan.length === 0}
            className="flex items-center gap-3 px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-2xl hover:bg-slate-50 transition-all font-bold disabled:opacity-50 shadow-sm"
          >
            <Download className="w-5 h-5" /> Export PDF
          </button>
          <button 
            onClick={generatePlan}
            className="flex items-center gap-3 px-8 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all font-bold shadow-xl shadow-blue-200 active:scale-95"
          >
            <Grid className="w-5 h-5" /> Générer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2"><Settings className="w-4 h-4 text-blue-600" /> Configuration</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Choix de la Salle</label>
                <select 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-slate-800"
                  value={selectedRoomId}
                  onChange={(e) => setSelectedRoomId(e.target.value)}
                >
                  {rooms.map(r => <option key={r.id} value={r.id}>{r.name} ({r.rows}x{r.cols} bancs)</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Type de Session</label>
                <select 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-slate-800"
                  value={selectedSession}
                  onChange={(e) => setSelectedSession(e.target.value)}
                >
                  <option value="cc">Contrôle Continu ({examThresholds.cc}%)</option>
                  <option value="normal">Session Normale ({examThresholds.normal}%)</option>
                  <option value="rattrapage">Rattrapage ({examThresholds.rattrapage}%)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Groupe de Niveaux</label>
                <div className="flex p-1 bg-slate-100 rounded-xl">
                  <button 
                    onClick={() => setLevelGroup('1&2')}
                    className={cn("flex-1 py-2 text-xs font-bold rounded-lg transition-all", levelGroup === '1&2' ? "bg-white text-blue-600 shadow-sm" : "text-slate-500")}
                  >
                    1 & 2
                  </button>
                  <button 
                    onClick={() => setLevelGroup('3&4&5')}
                    className={cn("flex-1 py-2 text-xs font-bold rounded-lg transition-all", levelGroup === '3&4&5' ? "bg-white text-blue-600 shadow-sm" : "text-slate-500")}
                  >
                    3, 4 & 5
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-blue-600 p-8 rounded-3xl text-white shadow-xl shadow-blue-200">
            <h4 className="font-bold mb-2 flex items-center gap-2"><Check className="w-4 h-4" /> Logique Appliquée</h4>
            <p className="text-xs text-blue-100 font-medium leading-relaxed">
              Le mélange se fait automatiquement entre les filières. Deux étudiants d'une même filière ne sont jamais placés sur le même banc. Les étudiants sont triés par ordre alphabétique avant placement.
            </p>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 overflow-x-auto min-h-[600px]">
            {plan.length > 0 ? (
              <div className="space-y-10 min-w-[800px]">
                <div className="relative h-20 bg-slate-900 rounded-2xl flex items-center justify-center">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-2 bg-blue-600 rounded-b-full"></div>
                  <span className="text-white font-black uppercase tracking-[0.3em] text-xs">Tableau / Bureau de Surveillance</span>
                </div>
                
                <div className="grid gap-10">
                  {plan.map((row, rIndex) => (
                    <div key={rIndex} className="flex items-start gap-6">
                      <div className="w-10 h-14 flex items-center justify-center bg-slate-100 rounded-xl text-[10px] font-black text-slate-400">R{rIndex + 1}</div>
                      <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {row.map((bench, bIndex) => (
                          <div key={bIndex} className="flex flex-col border-2 border-slate-50 rounded-2xl overflow-hidden shadow-sm hover:border-blue-100 transition-colors">
                            <div className="bg-slate-50 text-[9px] font-black text-slate-400 text-center py-1.5 border-b border-slate-100 uppercase tracking-widest">
                              Banc {bIndex + 1}
                            </div>
                            <div className="grid grid-cols-2 divide-x-2 divide-slate-50 h-full">
                              {[0, 1].map(seatIdx => (
                                <div key={seatIdx} className={cn("p-4 text-center min-h-[80px] flex flex-col justify-center", bench[seatIdx] ? "bg-white" : "bg-slate-50/20")}>
                                  {bench[seatIdx] ? (
                                    <>
                                      <p className="text-[9px] font-black text-blue-600 truncate mb-1">{bench[seatIdx]!.id}</p>
                                      <p className="text-[10px] font-bold text-slate-800 leading-tight line-clamp-2">{bench[seatIdx]!.name}</p>
                                      <p className="text-[8px] font-bold text-slate-400 mt-2 uppercase">{MAJORS.find(m => m.id === bench[seatIdx]!.majorId)?.abbreviation}</p>
                                    </>
                                  ) : (
                                    <span className="text-[9px] font-bold text-slate-200 uppercase tracking-tighter">Place Vide</span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-300 py-32">
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                  <Grid className="w-10 h-10 opacity-20" />
                </div>
                <p className="text-xl font-bold text-slate-400">Aucun plan de salle généré</p>
                <p className="text-sm font-medium text-slate-300 mt-1">Configurez les paramètres à gauche et cliquez sur "Générer"</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingsView = ({ 
  examThresholds, 
  setExamThresholds,
  rooms,
  students,
  addRoom,
  deleteRoom,
  updateRoom,
  user
}: any) => {
  const [newRoom, setNewRoom] = useState({ name: '', rows: 5, cols: 5 });

  const handleUpdateThreshold = (key: string, val: string) => {
    setExamThresholds({ ...examThresholds, [key]: parseInt(val) || 0 });
  };

  const handleAddRoom = () => {
    if (!newRoom.name) return toast.error("Nom de salle requis");
    addRoom({ id: Date.now().toString(), ...newRoom });
    setNewRoom({ name: '', rows: 5, cols: 5 });
    toast.success("Nouvelle salle ajoutée");
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Paramètres</h1>
        <p className="text-slate-500 font-medium mt-2">Configuration globale et gestion des ressources.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
          <h2 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-amber-500" /> Seuils d'Examen
          </h2>
          <div className="space-y-8">
            <div className="flex items-center justify-between group">
              <div>
                <label className="font-bold text-slate-700 block">Contrôle Continu</label>
                <p className="text-xs text-slate-400 font-medium">Pourcentage minimum payé</p>
              </div>
              <div className="flex items-center gap-4">
                <input 
                  type="number" 
                  className="w-24 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-right font-black text-blue-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  value={examThresholds.cc}
                  onChange={(e) => handleUpdateThreshold('cc', e.target.value)}
                />
                <span className="text-slate-400 font-black">%</span>
              </div>
            </div>
            <div className="flex items-center justify-between group">
              <div>
                <label className="font-bold text-slate-700 block">Session Normale</label>
                <p className="text-xs text-slate-400 font-medium">Pourcentage minimum payé</p>
              </div>
              <div className="flex items-center gap-4">
                <input 
                  type="number" 
                  className="w-24 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-right font-black text-emerald-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  value={examThresholds.normal}
                  onChange={(e) => handleUpdateThreshold('normal', e.target.value)}
                />
                <span className="text-slate-400 font-black">%</span>
              </div>
            </div>
            <div className="flex items-center justify-between group">
              <div>
                <label className="font-bold text-slate-700 block">Rattrapage</label>
                <p className="text-xs text-slate-400 font-medium">Pourcentage minimum payé</p>
              </div>
              <div className="flex items-center gap-4">
                <input 
                  type="number" 
                  className="w-24 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-right font-black text-rose-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  value={examThresholds.rattrapage}
                  onChange={(e) => handleUpdateThreshold('rattrapage', e.target.value)}
                />
                <span className="text-slate-400 font-black">%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
          <h2 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
            <Grid className="w-6 h-6 text-indigo-500" /> Gestion des Salles
          </h2>
          <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 mb-8 custom-scrollbar">
            {rooms.map((r: Room) => (
              <div key={r.id} className="p-5 bg-slate-50 rounded-2xl flex items-center justify-between border border-transparent hover:border-slate-200 transition-all">
                <div>
                  <p className="font-black text-slate-900">{r.name}</p>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{r.rows} rangées × {r.cols} bancs</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => deleteRoom(r.id)} className="p-2 hover:bg-rose-100 rounded-xl text-rose-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="pt-6 border-t border-slate-100">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">Ajouter une salle</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input 
                type="text" 
                placeholder="Nom (ex: Amphi B)" 
                className="col-span-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:ring-2 focus:ring-blue-500"
                value={newRoom.name}
                onChange={e => setNewRoom({...newRoom, name: e.target.value})}
              />
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-slate-400 uppercase">Rgs</span>
                <input 
                  type="number" 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none"
                  value={newRoom.rows}
                  onChange={e => setNewRoom({...newRoom, rows: parseInt(e.target.value) || 0})}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-slate-400 uppercase">Bcs</span>
                <input 
                  type="number" 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none"
                  value={newRoom.cols}
                  onChange={e => setNewRoom({...newRoom, cols: parseInt(e.target.value) || 0})}
                />
              </div>
            </div>
            <button 
              onClick={handleAddRoom}
              className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-black transition-all shadow-xl shadow-slate-200"
            >
              Créer la salle
            </button>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 p-10 rounded-[2.5rem] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 blur-[120px] opacity-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div>
            <h3 className="text-2xl font-black mb-2 tracking-tight">Exportation des Données</h3>
            <p className="text-slate-400 font-medium">Sauvegardez l'intégralité de la base de données en format JSON.</p>
          </div>
          <button 
            onClick={() => {
              const data = { students, rooms, examThresholds };
              const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `backup_univ_${new Date().toISOString().split('T')[0]}.json`;
              a.click();
              toast.success("Sauvegarde réussie.");
            }}
            className="px-10 py-5 bg-white text-slate-900 font-black rounded-3xl hover:bg-slate-100 transition-all flex items-center gap-4 shadow-2xl"
          >
            <Download className="w-6 h-6" /> Télécharger Backup
          </button>
        </div>
      </div>
    </div>
  );
};