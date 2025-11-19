"use client";

import {
  ArrowRight,
  Link2,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

const perks = [
  {
    icon: Sparkles,
    label: "Custom slugs & branded domains",
  },
  {
    icon: ShieldCheck,
    label: "Link health & fraud protection",
  },
  {
    icon: Zap,
    label: "Realtime analytics dashboard",
  },
];

export function Header() {
  return (
    <header className="glass-panel hero-panel relative overflow-hidden px-6 py-10 sm:px-10 sm:py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
      >
        <div className="absolute -right-16 top-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,_rgba(129,140,248,0.5),_transparent_60%)] blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(14,165,233,0.45),_transparent_60%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.22),_transparent_45%)]" />
      </div>

      <div className="relative">
        <div className="space-y-8">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-fuchsia-500 text-white shadow-xl shadow-indigo-500/30">
              <Link2 className="h-6 w-6" strokeWidth={2.5} />
              <span className="absolute inset-0 rounded-2xl border border-white/20" />
            </div>
            <div className="space-y-1">
              <p className="pill text-[10px] tracking-[0.35em] text-muted-foreground">
                TinyLink OS
              </p>
              <p className="text-base font-semibold text-muted-foreground">
                Create, brand, and monitor links in one modern workspace.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-semibold leading-tight text-slate-900 dark:text-white md:text-5xl lg:text-6xl">
              Short links,
              <br className="hidden md:block" />
              <span className="gradient-text"> big brand energy.</span>
            </h1>
            <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
              Ship memorable short URLs with enterprise reliability, custom
              guardrails, and live insight into every single click.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="#create-link"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/30 transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white/90 dark:text-slate-900"
            >
              Create short link
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#links"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm backdrop-blur dark:border-white/20 dark:bg-white/10 dark:text-white"
            >
              View live stats
            </a>
          </div>

          <ul className="flex flex-wrap gap-3">
            {perks.map((perk) => (
              <li
                key={perk.label}
                className="group inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-700 backdrop-blur transition hover:-translate-y-0.5 hover:border-white/80 dark:border-white/20 dark:bg-white/5 dark:text-white/80"
              >
                <perk.icon className="h-4 w-4 text-primary" strokeWidth={2.5} />
                {perk.label}
              </li>
            ))}
          </ul>
        </div>

        {/* <div className="space-y-4 rounded-[24px] border border-white/30 bg-white/60 p-6 shadow-2xl shadow-indigo-500/20 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Live Network
              </p>
              <p className="text-3xl font-semibold text-slate-900 dark:text-white">
                99.98%
              </p>
              <p className="text-sm text-muted-foreground">Uptime this year</p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/30 bg-white/60 p-5 shadow-md dark:border-white/10 dark:bg-white/5">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Smart routing
            </p>
            <p className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">
              <span className="gradient-text text-3xl font-semibold">47ms</span>{" "}
              avg. redirect speed
            </p>
          </div>
        </div> */}
      </div>
    </header>
  );
}


// "use client";

// import { Link2, Sparkles, TrendingUp, Zap, ArrowRight } from "lucide-react";

// export function Header() {
//     return (
//         <header className="relative overflow-hidden rounded-3xl border border-violet-200/60 bg-gradient-to-br from-violet-100 via-white to-indigo-100 shadow-2xl dark:from-violet-950/40 dark:via-neutral-900 dark:to-indigo-950/40 dark:border-violet-800/40">
//             {/* Animated background gradients */}
//             <div className="absolute inset-0 overflow-hidden opacity-40">
//                 <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-400 blur-3xl animate-blob"></div>
//                 <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-indigo-400 to-cyan-400 blur-3xl animate-blob animation-delay-2000"></div>
//                 <div className="absolute -bottom-32 left-1/2 h-96 w-96 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 blur-3xl animate-blob animation-delay-4000"></div>
//             </div>

//             {/* Dotted pattern overlay */}
//             <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(148_163_184/0.15)_1px,transparent_0)] [background-size:24px_24px]"></div>

//             <div className="relative z-10 p-8 md:p-10 lg:p-12">
//                 {/* Top bar with brand */}
//                 <div className="mb-8 flex items-center justify-between">
//                     <div className="flex items-center gap-4">
//                         <div className="relative group">
//                             <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 opacity-75 blur-lg group-hover:opacity-100 transition duration-500"></div>
//                             <div className="relative rounded-2xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-indigo-600 p-3.5 shadow-xl">
//                                 <Link2 className="h-7 w-7 text-white" strokeWidth={2.5} />
//                             </div>
//                         </div>
//                         <div>
//                             <div className="flex items-center gap-2">
//                                 <span className="text-xl font-black tracking-tight text-gray-900 dark:text-white">
//                                     TinyLink
//                                 </span>
//                                 <div className="rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 px-2.5 py-1 text-xs font-bold text-white shadow-md">
//                                     PRO
//                                 </div>
//                             </div>
//                             <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
//                                 Next-gen URL shortener
//                             </p>
//                         </div>
//                     </div>
                    
//                     <div className="hidden sm:flex items-center gap-2 rounded-full bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border border-violet-200/60 dark:border-violet-800/60 px-4 py-2 shadow-lg">
//                         <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
//                         <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
//                             Live
//                         </span>
//                     </div>
//                 </div>

//                 {/* Hero content */}
//                 <div className="mb-8 space-y-6">
//                     <h1 className="text-5xl font-black leading-[1.1] tracking-tight text-gray-900 dark:text-white md:text-6xl lg:text-7xl">
//                         Short links,{" "}
//                         <br className="hidden sm:block" />
//                         <span className="relative inline-block">
//                             <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 blur-2xl opacity-50"></span>
//                             <span className="relative bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 bg-clip-text text-transparent">
//                                 big impact.
//                             </span>
//                         </span>
//                     </h1>
                    
//                     <p className="max-w-2xl text-xl font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
//                         Create memorable short links, share them instantly, and track every click with powerful analytics in real time.
//                     </p>
//                 </div>

//                 {/* Stats preview */}
//                 <div className="mb-8 grid grid-cols-3 gap-4 md:gap-6">
//                     <div className="rounded-2xl bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm border border-violet-200/60 dark:border-violet-800/60 p-4 shadow-lg">
//                         <div className="text-3xl font-black text-transparent bg-gradient-to-br from-violet-600 to-fuchsia-600 bg-clip-text">
//                             99.9%
//                         </div>
//                         <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 mt-1">
//                             Uptime
//                         </div>
//                     </div>
//                     <div className="rounded-2xl bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm border border-indigo-200/60 dark:border-indigo-800/60 p-4 shadow-lg">
//                         <div className="text-3xl font-black text-transparent bg-gradient-to-br from-indigo-600 to-cyan-600 bg-clip-text">
//                             &lt;50ms
//                         </div>
//                         <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 mt-1">
//                             Response
//                         </div>
//                     </div>
//                     <div className="rounded-2xl bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm border border-fuchsia-200/60 dark:border-fuchsia-800/60 p-4 shadow-lg">
//                         <div className="text-3xl font-black text-transparent bg-gradient-to-br from-fuchsia-600 to-pink-600 bg-clip-text">
//                             24/7
//                         </div>
//                         <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 mt-1">
//                             Tracking
//                         </div>
//                     </div>
//                 </div>

//                 {/* Feature badges */}
//                 <div className="flex flex-wrap gap-3">
//                     <div className="group relative overflow-hidden rounded-2xl border border-violet-300/60 dark:border-violet-700/60 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm px-5 py-3 shadow-lg transition-all hover:shadow-xl hover:scale-105 hover:border-violet-500">
//                         <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
//                         <div className="relative flex items-center gap-2.5">
//                             <div className="rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 p-1.5">
//                                 <Zap className="h-4 w-4 text-white" strokeWidth={2.5} />
//                             </div>
//                             <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
//                                 Lightning Fast
//                             </span>
//                         </div>
//                     </div>
                    
//                     <div className="group relative overflow-hidden rounded-2xl border border-indigo-300/60 dark:border-indigo-700/60 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm px-5 py-3 shadow-lg transition-all hover:shadow-xl hover:scale-105 hover:border-indigo-500">
//                         <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
//                         <div className="relative flex items-center gap-2.5">
//                             <div className="rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 p-1.5">
//                                 <TrendingUp className="h-4 w-4 text-white" strokeWidth={2.5} />
//                             </div>
//                             <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
//                                 Real-time Analytics
//                             </span>
//                         </div>
//                     </div>
                    
//                     <div className="group relative overflow-hidden rounded-2xl border border-fuchsia-300/60 dark:border-fuchsia-700/60 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm px-5 py-3 shadow-lg transition-all hover:shadow-xl hover:scale-105 hover:border-fuchsia-500">
//                         <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
//                         <div className="relative flex items-center gap-2.5">
//                             <div className="rounded-lg bg-gradient-to-br from-fuchsia-500 to-pink-500 p-1.5">
//                                 <Sparkles className="h-4 w-4 text-white" strokeWidth={2.5} />
//                             </div>
//                             <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
//                                 Custom Codes
//                             </span>
//                         </div>
//                     </div>

//                     <button className="group relative overflow-hidden rounded-2xl border border-gray-300/60 dark:border-gray-700/60 bg-gray-900 dark:bg-white backdrop-blur-sm px-5 py-3 shadow-lg transition-all hover:shadow-xl hover:scale-105">
//                         <div className="relative flex items-center gap-2.5">
//                             <span className="text-sm font-bold text-white dark:text-gray-900">
//                                 Get Started
//                             </span>
//                             <ArrowRight className="h-4 w-4 text-white dark:text-gray-900 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
//                         </div>
//                     </button>
//                 </div>
//             </div>

//             <style jsx>{`
//                 @keyframes blob {
//                     0%, 100% {
//                         transform: translate(0, 0) scale(1);
//                     }
//                     33% {
//                         transform: translate(30px, -50px) scale(1.1);
//                     }
//                     66% {
//                         transform: translate(-20px, 20px) scale(0.9);
//                     }
//                 }
//                 .animate-blob {
//                     animation: blob 7s infinite;
//                 }
//                 .animation-delay-2000 {
//                     animation-delay: 2s;
//                 }
//                 .animation-delay-4000 {
//                     animation-delay: 4s;
//                 }
//             `}</style>
//         </header>
//     );
// }