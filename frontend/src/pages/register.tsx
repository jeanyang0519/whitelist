import React from 'react'
import { Formik, Form } from 'formik'
import { Box, Button, Link } from '@chakra-ui/core'
import { Wrapper } from '../components/Wrapper'
import { InputField } from '../components/InputField'
import { useRegisterMutation } from '../generated/graphql'
import { toErrorMap } from '../utils/toErrorMap'
import { useRouter } from 'next/router'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'
import NextLink from "next/link"

interface registerPrors {}

const Register: React.FC<registerPrors> = ({}) => {
    const router = useRouter()
    const [, register] = useRegisterMutation()
    return (
        <Wrapper variant="small">
            <Formik 
                initialValues={{ username: "", password: "" }}
                onSubmit={async (values, { setErrors }) => {
                    const response = await register(values)
                    if (response.data?.register.errors) {
                        setErrors(toErrorMap(response.data.register.errors))
                    } else if (response.data?.register.user) {
                        router.push("/")
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
                            register
                        </Button>
                    </Form>
                )}
            </Formik>
            <Box fontSize="xs" mt={2}>
                <NextLink href="/login">
                    <Link mr={2}>Log in</Link>
                </NextLink>
                <NextLink href="/">
                    <Link>Go back</Link>
                </NextLink>
            </Box>
        </Wrapper>
    )
}

export default withUrqlClient(createUrqlClient)(Register)