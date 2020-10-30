import React from 'react'
import { Formik, Form } from 'formik'
import { Box, Button, Flex, IconButton, Link } from '@chakra-ui/core'
import { Wrapper } from '../components/Wrapper'
import { InputField } from '../components/InputField'
import { useLoginMutation } from '../generated/graphql'
import { toErrorMap } from '../utils/toErrorMap'
import { useRouter } from 'next/router'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'
import { PrimaryLink } from '../components/PrimaryLink'

const Login: React.FC<{}> = ({}) => {
    const router = useRouter()
    const [, login] = useLoginMutation()
    return (
        <Wrapper variant="small">
            <Formik 
                initialValues={{ username: "", password: "" }}
                onSubmit={async (values, { setErrors }) => {
                    const response = await login(values)
                    if (response.data?.login.errors) {
                        setErrors(toErrorMap(response.data.login.errors))
                    } else if (response.data?.login.user) {
                        if (typeof router.query.next === "string") {
                            router.push(router.query.next)
                        } else {
                            router.push("/")
                        }
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="username"
                            placeholder="username"
                            label="Username"
                        />
                        <Box mt={4}>
                            <InputField
                                name="password"
                                placeholder="password"
                                label="Password"
                                type="password"
                            />
                        </Box>
                        <Button
                            mt={4}
                            type="submit"
                            isLoading={isSubmitting}
                            variantColor="blue"
                        >
                            Log in
                        </Button>
                    </Form>
                )}
            </Formik>
            <Flex>
                <PrimaryLink href="/register" text="Register" mr="2"/>
                <PrimaryLink href="/" text="Go back"/>
            </Flex>
        </Wrapper>
    )
}

export default withUrqlClient(createUrqlClient)(Login)