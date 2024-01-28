export default function PlayerStatsLoading() {
  return (
    <main className='flex-1 flex flex-col items-center justify-center space-y-4'>
      <h1 className='text-2xl font-bold animate-pulse'>Loading...</h1>
      <p className='text-lg text-center text-slate-500'>{"This won't take long"}</p>
    </main>
  );
}
