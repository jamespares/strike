import ExcelJS from 'exceljs'
import { supabase } from '@/lib/clients/supabaseClient'

export const generateGanttChart = async (userId: string, tasks: any[], surveyData: any): Promise<string> => {
  try {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Gantt Chart')

    // Define columns
    worksheet.columns = [
      { header: 'Task', key: 'task', width: 30 },
      { header: 'Start Date', key: 'start', width: 15 },
      { header: 'End Date', key: 'end', width: 15 },
      { header: 'Duration', key: 'duration', width: 10 },
    ]

    // Add tasks
    tasks.forEach(task => {
      worksheet.addRow({
        task: task.name,
        start: task.startDate,
        end: task.endDate,
        duration: task.duration
      })
    })

    // Generate buffer
    const buffer = await workbook.xlsx.writeBuffer()

    // Upload to Supabase Storage under 'gantt' folder
    const fileName = `gantt/gantt-${userId}-${Date.now()}.xlsx`
    const { data, error } = await supabase.storage
      .from('project-tools')
      .upload(fileName, buffer, {
        contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        upsert: true
      })

    if (error) throw error

    // Get public URL
    const { data: publicUrl, error: urlError } = supabase.storage
      .from('project-tools')
      .getPublicUrl(fileName)

    if (urlError) throw urlError

    return publicUrl.publicUrl
  } catch (error) {
    console.error('Error creating Gantt Chart:', error)
    throw error
  }
}

export const generateGanttCSV = async (tasks: any[]) => {
  // Your existing implementation
} 