export function formatTimeDifference(startTime, endTime) {
    // Вычисляем разницу в миллисекундах
    const differenceInMs = endTime - startTime;

    // Получаем количество секунд
    const totalSeconds = Math.floor(differenceInMs / 1000);

    // Вычисляем минуты и оставшиеся секунды
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    // Форматируем результат
    return `${minutes} мин ${seconds > 0 ? seconds + ' сек' : ''}`;
}

export function calculateTime(startTime, endTime, seconds) {
    let duration = (endTime - startTime - seconds) / 1000;

    // Проверяем, если длительность меньше или равна нулю
    if (duration <= 0) {
        return "00:00";
    }

    let minutes = Math.floor(duration / 60);
    let secondsLeft = Math.floor(duration % 60);
    
    // Форматируем минуты и секунды
    let formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    let formattedSeconds = secondsLeft < 10 ? '0' + secondsLeft : secondsLeft;
    
    return `${formattedMinutes}:${formattedSeconds}`;
}