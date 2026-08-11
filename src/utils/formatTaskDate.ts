const taskDateFormatter = new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
});

export function formatTaskDate(value: string) {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return 'Fecha no disponible';
    }

    return taskDateFormatter.format(date);
}
