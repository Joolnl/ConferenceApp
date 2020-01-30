export function sortByDate(a, b) {
    if ((new Date(b.date)).getTime() > (new Date(a.date)).getTime()) {
        return 1;
    } else {
        return -1;
    }
}
