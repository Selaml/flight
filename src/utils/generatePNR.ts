

export const generatePnrCode = () => {

    try {

        const pnrCode = Math.floor(1000 + Math.random() * 9000);
        return pnrCode

    } catch (error) {
        return error.message
    }

}