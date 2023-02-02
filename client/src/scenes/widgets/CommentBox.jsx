import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setPost } from "state";

const commentSchema = yup.object().shape({
    comment: yup.string().required("required")
});


const initialValues = {
    comment: "",
};

const CommentBox = (postId) => {
    console.log(postId);
    const token = useSelector((state) => state.token);
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const handleComment = async (values, onSubmitProps) => {
        const response = await fetch(`http://localhost:3001/posts/${postId.postId}/comment`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ values }),
            });
            onSubmitProps.resetForm();
            const updatedPost = await response.json();
            dispatch(setPost({ post: updatedPost }));
    };


    return (
    <Formik
        onSubmit={handleComment}
        initialValues={initialValues}
        validationSchema={commentSchema}
    >
        {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
        }) => (
        <form onSubmit={handleSubmit}>
            <Box
            mt="1rem"
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
            >
                <TextField
                    label="Comment"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.comment}
                    name="comment"
                    error={
                        Boolean(touched.comment) && Boolean(errors.comment)
                    }
                    helperText={touched.comment && errors.comment}
                    sx={{ gridColumn: "span 3" }}
                />
                <Button
                    fullWidth
                    type="submit"
                    sx={{
                    gridColumn:"span 1",
                    m: "0",
                    p: "1rem",
                    backgroundColor: palette.primary.main,
                    color: palette.background.alt,
                    "&:hover": { color: palette.primary.main },
                    }}
                >
                    comment
                </Button>
            </Box>
                
            
        </form>
        )}
    </Formik>
    );
};

export default CommentBox;