import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

function uuid() {
    return uuidv4();
}

export {uuid}