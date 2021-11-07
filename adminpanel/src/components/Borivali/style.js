import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    icons: {
        display: 'none'
    },
    name: {
        display: 'flex',
        justifyContent: 'space-between',
        '&:hover $icons': {
            display: 'inline'
        }
    }
})

export default useStyles;