import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    header: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(33, 150, 243, 0.9)',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    content: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    button: {
        backgroundColor: 'rgba(33, 150, 243, 0.9)',
        padding: 15,
        borderRadius: 12,
        marginVertical: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    dataContainer: {
        marginTop: 20,
        padding: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    dataTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    dataText: {
        fontSize: 14,
        color: '#666',
        marginVertical: 2,
    },
});