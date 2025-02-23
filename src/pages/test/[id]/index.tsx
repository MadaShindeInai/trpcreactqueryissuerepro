import {
  type GetStaticPaths,
  type GetStaticPropsContext,
  type InferGetStaticPropsType,
} from "next";
import { prefetchHelper } from "~/pages/api/trpc/[trpc]";

export const getQuestionUrlWithBlockedSubroute = (id: string) =>
  `/test/${id}/blocked`;

const redirectToQWithBlockedSubroute = (slug: string) => ({
  redirect: {
    permanent: false,
    destination: getQuestionUrlWithBlockedSubroute(slug),
  },
});

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params?.id;
  if (typeof id !== "string") return { notFound: true };

  const data = await prefetchHelper.test1.fetch({
    id,
  });

  if (!data) return { notFound: true };

  // if (data.data) return redirectToQWithBlockedSubroute(id);

  await prefetchHelper.test2.prefetch({ id });

  return {
    props: {
      trpcState: prefetchHelper.dehydrate(),
      id,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const arr = Array.from({ length: 100 }, (_, i) => i + 1);
  return {
    paths: arr.map((q) => ({
      params: { id: q.toString() },
    })),
    fallback: "blocking",
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const QuestionPage = ({ id }: Props) => {
  return (
    <>
      <h1>{id}</h1>
    </>
  );
};

export default QuestionPage;
