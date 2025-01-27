export let soundOn: boolean = true;

export const handleSoundClick = () => {
    const soundElement = document.getElementById("sound-button");
    
    if (soundElement) {
        soundElement.addEventListener("click", () => {
            try {
                if (soundElement.style.filter === 'grayscale(1)') {
                    soundElement.style.filter = 'none';
                    soundOn = true;
                    console.log(soundOn);
                } else {
                    soundElement.style.filter = 'grayscale(1)';
                    soundOn = false;
                    console.log(soundOn);
                }
            } catch (error) {
                console.error("Fel vid klickhantering:", error);
            }
        });
    } else {
        console.error("Element med ID 'sound' hittades inte.");
    }
}