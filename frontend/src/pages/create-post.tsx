import React from "react";
import { Box, Button } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { InputField } from "../components/InputFieldProps";
import { Layout } from "../components/Layout";
import { useCreatePostMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useIsAuth"


const CreatePost: React.FC<{}> = ({}) => {
  const router = useRouter()
  useIsAuth()
  const [,createPost] = useCreatePostMutation();
  return (
    <Layout variant="small">
      <Formik
        initialValues={{ plate: "", company: "" }}
        onSubmit={async (values) => {
            const { error } = await createPost({ input: values })
            if (error?.message.includes("not authenticated")) {
                router.push("/login")
            } else {
                router.push("/")
            }
            // await createPost({input: values})        
        }}
        // onSubmit={async (values) => {
        //   const { errors } = await createPost({
        //     variables: { input: values },
        //     update: (cache) => {
        //       cache.evict({ fieldName: "posts:{}" });
        //     },
        //   });
        //   if (!errors) {
        //     router.push("/");
        //   }
        // }}
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
              variantColor="teal"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost)
