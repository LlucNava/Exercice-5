import { parse } from 'csv-parse/sync'

export const isCSV = (data) => {
    try {
        parse(data, { colums: false, skip_empty_lines: true})
        return true
    } catch {
        return false
    }
}