import React from "react";
import { Box, Button, Link, Spinner } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { InputField } from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import {
  usePostQuery,
  useUpdatePostMutation,
} from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { useGetIntId } from "../../../utils/useGetIntId";
import NextLink from "next/link";

const EditPost = ({}) => {
  const router = useRouter();
  const intId = useGetIntId();
  const [{ data, fetching }] = usePostQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });
  const [, updatePost] = useUpdatePostMutation();

  if (fetching || !data?.post) {
    return (
      <Layout>
        <div>Loading <Spinner/></div>
      </Layout>
    );
  }

  return (
    <Layout variant="small">
        <Formik
            initialValues={{ plate: data.post.plate, company: data.post.company }}
            onSubmit={async (values) => {
            await updatePost({ id: intId, ...values });
            router.back();
            }}
        >
            {({ isSubmitting }) => (
            <Form>
                <InputField name="plate" placeholder="plate" label="Plate" />
                <Box mt={4}>
                <InputField
                  name="company"
                  placeholder="company"
                  label="Company"
                />
                </Box>
                <Button
                  mt={4}
                  type="submit"
                  isLoading={isSubmitting}
                  variantColor="blue"
                >
                  Save
                </Button>
                <Box fontSize="xs" mt={2}>
                  <NextLink href="/">
                      <Link>Go back</Link>
                  </NextLink>
                </Box>
            </Form>
            )}
        </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(EditPost);