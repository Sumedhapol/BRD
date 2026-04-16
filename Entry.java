public class Entry {
    private double sleepHours;
    private int stressLevel;
    private double studyHours;
    private int moodScore;

    public Entry() {
    }

    public Entry(double sleepHours, int stressLevel, double studyHours, int moodScore) {
        this.sleepHours = sleepHours;
        this.stressLevel = stressLevel;
        this.studyHours = studyHours;
        this.moodScore = moodScore;
    }

    public double getSleepHours() {
        return sleepHours;
    }

    public void setSleepHours(double sleepHours) {
        this.sleepHours = sleepHours;
    }

    public int getStressLevel() {
        return stressLevel;
    }

    public void setStressLevel(int stressLevel) {
        this.stressLevel = stressLevel;
    }

    public double getStudyHours() {
        return studyHours;
    }

    public void setStudyHours(double studyHours) {
        this.studyHours = studyHours;
    }

    public int getMoodScore() {
        return moodScore;
    }

    public void setMoodScore(int moodScore) {
        this.moodScore = moodScore;
    }

    @Override
    public String toString() {
        return "Entry{" +
                "sleepHours=" + sleepHours +
                ", stressLevel=" + stressLevel +
                ", studyHours=" + studyHours +
                ", moodScore=" + moodScore +
                '}';
    }
}
