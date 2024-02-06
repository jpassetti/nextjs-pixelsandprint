import { useRouter } from 'next/router';

const YearPage = () => {
  const router = useRouter();
  const { year } = router.query;

  return (
    <div>
      <h1>Year: {year}</h1>
      {/* Your page content here */}
    </div>
  );
};

export default YearPage;