type ProgressBarProps = {
  step: number;
  total: number;
};

export default function ProgressBar({ step, total }: ProgressBarProps) {
  const progress = (step / total) * 100;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-zinc-400">Progresso</p>

        <p className="text-sm text-zinc-400">
          {step}/{total}
        </p>
      </div>

      <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-white transition-all duration-500"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    </div>
  );
}
