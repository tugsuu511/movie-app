export const GenreDiv = ({ text }: { text: string }) => {
    return (
      <div className="h-5 rounded-full border border-customGenre dark:border-customGenredark inline-flex text-xs justify-center items-center font-semibold px-2 dark:border dark:border-customGenredark">
        {text}
      </div>
    );
  };