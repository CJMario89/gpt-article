import Redirect from "component/Redirect";

export const getServerSideProps = async ({ params }) => {
  const { region } = params;
  return { props: { region } };
};

export default function Index({ region }) {
  return <Redirect url={`/explore/${region}/All`} />;
}
