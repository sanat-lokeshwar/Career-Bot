// Keywords related to career topics
const careerKeywords = [
  "resume",
  "cv",
  "interview",
  "job",
  "career",
  "salary",
  "skills",
  "placement",
  "internship",
  "company",
  "developer",
  "engineer",
  "manager",
  "role",
  "promotion",
  "experience",
  "linkedin",
  "portfolio",
  "hiring",
  "offer"
]

// Function to check if message is career-related
const isCareerRelated = (message) => {
  const lowerMessage = message.toLowerCase()

  return careerKeywords.some(keyword =>
    lowerMessage.includes(keyword)
  )
}

module.exports = { isCareerRelated }