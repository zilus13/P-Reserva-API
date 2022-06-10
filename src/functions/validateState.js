export function validateState(value) {
    if (value === 'PENDIENTE') return true;
    if (value === 'PAGADO') return true;
    if (value === 'ELIMINADO') return true;
    return false
}