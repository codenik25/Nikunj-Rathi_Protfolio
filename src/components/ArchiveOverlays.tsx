import React from 'react';
import { ArchiveModal } from './ArchiveModal';

// --- Overlay 1: Problem Solving ---
export const ProblemSolvingOverlay: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <ArchiveModal isOpen={isOpen} onClose={onClose} title="Problem Solving">
      <div className="p-8 space-y-8 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="col-span-1 lg:col-span-1 space-y-4">
            <h4 className="text-xl font-display font-bold">148+ LeetCode Problems</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              An ongoing log of algorithmic problem solving, focusing on logic, complexity analysis, and pattern recognition. I prioritize understanding the core mechanics over memorizing solutions.
            </p>
            <div className="flex flex-col gap-2 pt-4">
              {['ARRAYS', 'LINKED LISTS', 'TREES', 'BST', 'HEAP', 'GRAPH', 'DP', 'BINARY SEARCH'].map((cat) => (
                <div key={cat} className="px-4 py-3 border border-white/10 rounded-lg hover:border-white/30 hover:bg-white/5 transition-colors cursor-pointer flex justify-between items-center group">
                  <span className="font-sans font-semibold text-xs tracking-wider">{cat}</span>
                  <span className="text-slate-600 group-hover:text-cyan-400 transition-colors">→</span>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-1 lg:col-span-2 bg-[#0a0f1a] rounded-xl border border-white/5 p-8 flex flex-col items-center justify-center text-slate-500">
            <p className="text-xs font-sans font-medium tracking-widest uppercase text-slate-500">Select a category to view patterns</p>
            {/* Future expansion: real interactive panel for categories */}
            <div className="mt-8 grid grid-cols-2 gap-4 w-full max-w-md">
              <div className="p-4 border border-white/5 rounded-lg text-center">
                <span className="block text-2xl font-bold text-white mb-1">Easy</span>
                <span className="text-xs uppercase tracking-wider font-semibold">60%</span>
              </div>
              <div className="p-4 border border-white/5 rounded-lg text-center">
                <span className="block text-2xl font-bold text-cyan-400 mb-1">Medium</span>
                <span className="text-xs uppercase tracking-wider font-semibold">35%</span>
              </div>
              <div className="p-4 border border-white/5 rounded-lg text-center col-span-2">
                <span className="block text-2xl font-bold text-portfolio-secondary mb-1">Hard</span>
                <span className="text-xs uppercase tracking-wider font-semibold">5%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ArchiveModal>
  );
};

// --- Overlay 2: Primary Language ---
export const PrimaryLanguageOverlay: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <ArchiveModal isOpen={isOpen} onClose={onClose} title="Primary Language: C++">
      <div className="p-8 space-y-8 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h4 className="text-2xl font-display font-bold">Why C++?</h4>
            <p className="text-slate-400 leading-relaxed text-sm">
              C++ provides the perfect balance of low-level memory control and high-level abstractions via the Standard Template Library (STL). It forces a deeper understanding of computational complexity and resource management, which translates well into writing efficient code in any other language.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Algorithms', 'Data Structures', 'Competitive Programming', 'Low-latency'].map(tag => (
                <span key={tag} className="px-3 py-1.5 text-xs font-sans font-medium tracking-wide border border-portfolio-secondary/30 text-portfolio-secondary rounded-full bg-portfolio-secondary/5">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="bg-[#04060a] border border-white/10 rounded-xl p-6 font-mono text-xs overflow-x-auto shadow-inner relative">
            <div className="absolute top-0 right-0 p-4 opacity-30 text-xs font-sans font-medium uppercase tracking-widest">C++ STL</div>
            <pre className="text-slate-300 leading-loose">
<span className="text-cyan-400">#include</span> &lt;iostream&gt;{'\n'}
<span className="text-cyan-400">#include</span> &lt;vector&gt;{'\n'}
<span className="text-cyan-400">#include</span> &lt;unordered_map&gt;{'\n'}
<span className="text-cyan-400">#include</span> &lt;queue&gt;{'\n'}
{'\n'}
<span className="text-portfolio-secondary">using namespace</span> std;{'\n'}
{'\n'}
<span className="text-emerald-400">void</span> <span className="text-white">graphTraversal</span>() {'{\n'}
{'  '}vector&lt;<span className="text-emerald-400">int</span>&gt; adj[<span className="text-purple-400">100</span>];{'\n'}
{'  '}unordered_map&lt;<span className="text-emerald-400">int</span>, <span className="text-emerald-400">bool</span>&gt; visited;{'\n'}
{'  '}priority_queue&lt;<span className="text-emerald-400">int</span>, vector&lt;<span className="text-emerald-400">int</span>&gt;, greater&lt;<span className="text-emerald-400">int</span>&gt;&gt; minHeap;{'\n'}
{'\n'}
{'  '}<span className="text-slate-500">// BFS, DFS, Dijkstra...</span>{'\n'}
{'}'}
            </pre>
          </div>
        </div>
      </div>
    </ArchiveModal>
  );
};

// --- Overlay 3: Algorithmic Toolkit ---
export const AlgorithmicToolkitOverlay: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <ArchiveModal isOpen={isOpen} onClose={onClose} title="Algorithmic Toolkit">
      <div className="p-8 text-white min-h-[60vh] flex flex-col items-center justify-center">
        <div className="max-w-2xl w-full text-center mb-12">
          <p className="text-slate-400">
            A visual network of my core problem-solving domains. Understanding the progression from basic arrays to complex dynamic programming states.
          </p>
        </div>
        
        {/* Simple visual network layout */}
        <div className="flex flex-col items-center space-y-4">
          <div className="px-6 py-3 bg-white/5 border border-white/20 rounded-full hover:border-cyan-400 transition-colors cursor-crosshair">ARRAY</div>
          <div className="h-8 w-px bg-gradient-to-b from-white/20 to-white/5"></div>
          <div className="px-6 py-3 bg-white/5 border border-white/20 rounded-full hover:border-cyan-400 transition-colors cursor-crosshair">HASHING</div>
          <div className="h-8 w-px bg-gradient-to-b from-white/20 to-white/5"></div>
          <div className="flex gap-16 relative">
            <div className="absolute top-[-16px] left-1/2 w-32 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-1/2"></div>
            <div className="px-6 py-3 bg-white/5 border border-white/20 rounded-full hover:border-cyan-400 transition-colors cursor-crosshair">TREE</div>
            <div className="px-6 py-3 bg-white/5 border border-white/20 rounded-full hover:border-cyan-400 transition-colors cursor-crosshair">GRAPH</div>
          </div>
          <div className="h-8 w-px bg-gradient-to-b from-white/20 to-white/5 mt-4"></div>
          <div className="px-6 py-3 bg-portfolio-secondary/10 border border-portfolio-secondary/50 rounded-full text-portfolio-secondary hover:bg-portfolio-secondary/20 transition-colors cursor-crosshair shadow-[0_0_15px_rgba(168,85,247,0.15)]">DYNAMIC PROGRAMMING</div>
        </div>
      </div>
    </ArchiveModal>
  );
};

// --- Overlay 4: Milestone Detail ---
export const MilestoneDetailOverlay: React.FC<{ isOpen: boolean; onClose: () => void; milestoneId: string | null }> = ({ isOpen, onClose, milestoneId }) => {
  // In a real app we'd fetch the milestone by ID from achievements.ts
  return (
    <ArchiveModal isOpen={isOpen} onClose={onClose} title="Selected Milestone">
      <div className="p-8 text-white">
        <p className="text-slate-400 mb-8">Details for milestone {milestoneId}</p>
        <div className="bg-[#050811] p-6 rounded-xl border border-white/5">
           <h4 className="text-xl font-bold mb-2">Detailed View Under Construction</h4>
           <p className="text-sm text-slate-500">This connects to the specific credential URL, skills covered, and organization data.</p>
        </div>
      </div>
    </ArchiveModal>
  );
};
