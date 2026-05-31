export default function Skeleton() {
  return (
    <div className="bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 rounded-2xl p-5 flex flex-col h-full animate-pulse">
      {/* Місце під сердечко */}
      <div className="absolute top-4 right-4 w-10 h-10 bg-zinc-200 dark:bg-zinc-700 rounded-full"></div>

      {/* Місце під картинку */}
      <div className="h-56 w-full mb-4 bg-zinc-200 dark:bg-zinc-700 rounded-xl"></div>

      {/* Місце під заголовок (два рядки) */}
      <div className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded-md w-3/4 mb-2"></div>
      <div className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded-md w-1/2 mb-4 flex-grow"></div>

      {/* Місце під ціну */}
      <div className="h-8 bg-zinc-200 dark:bg-zinc-700 rounded-md w-1/3 mb-4 mt-auto"></div>

      {/* Місце під кнопку */}
      <div className="h-[52px] bg-zinc-200 dark:bg-zinc-700 rounded-xl w-full"></div>
    </div>
  );
}
