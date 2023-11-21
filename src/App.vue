<script>
import axios from 'axios';

export default {
  data() {
    return {
      jobs:[
        {
          title: "",
          link: "",
          status: ""
        }
      ],
      title:null,
      newJob:null
    };
  },
  mounted() {
    if (localStorage.getItem('jobs')) {
      try {
        this.jobs = JSON.parse(localStorage.getItem('jobs'));
      } catch(e) {
        localStorage.removeItem('jobs');
      }
    }
  },
  methods: {
    addJob() {
      // ensure they actually typed something
      if (!this.newJob) {
        return;
      }

      // fetch the job title from the url
      axios.get("http://localhost:3000/?url=" + this.newJob).then(response => {
        this.title = response.data;

        this.jobObject = {title: this.title || "", link:this.newJob, status:""};

        this.jobs.push(this.jobObject);
        this.newJob = '';
        this.saveJobs();
        });
    },
    removeJob(x) {
      this.jobs.splice(x, 1);
      this.saveJobs();
    },
    saveJobs() {
      const parsed = JSON.stringify(this.jobs);
      localStorage.setItem('jobs', parsed);
    },
    jobApplied(x) {
      this.jobs[x].status = "applied";
      this.saveJobs();
    },
    getApplied() {
      return Object.fromEntries(Object.entries(this.jobs).filter(([key, value]) => value.status === 'applied'));
    },
    jobInProgress(x) {
      this.jobs[x].status = "inprogress";
      this.saveJobs();
    },
    getInProgress() {
      return Object.fromEntries(Object.entries(this.jobs).filter(([key, value]) => value.status === 'inprogress'));
    },
    jobRejected(x) {
      this.jobs[x].status = "rejected";
      this.saveJobs();
    },
    getRejected() {
      return Object.fromEntries(Object.entries(this.jobs).filter(([key, value]) => value.status === 'rejected'));
    },
    getWithoutStatus() {
      return Object.fromEntries(Object.entries(this.jobs).filter(([key, value]) => value.status === ''));
    },
  }
};
</script>

<template>


<div id="app">
  <h2>Jobs</h2>

  <div v-for="(job, n) in getWithoutStatus()" :key="job">
    <p>
      <span class="job">{{ job.title || job.link }}</span>
      <button @click="removeJob(n)">Remove</button>
      <button @click="jobApplied(n)">Move to Applied</button>
      <button @click="jobInProgress(n)">Move to In Progress</button>
      <button @click="jobRejected(n)">Move to Rejected</button>
    </p>
  </div>

  <h3>Applied</h3>
  <div v-for="(job, n) in getApplied()" :key="job">
    <p>
      <span class="job">{{ job.link }}</span>
      <button @click="removeJob(n)">Remove</button>
      <button @click="jobApplied(n)">Move to Applied</button>
      <button @click="jobInProgress(n)">Move to In Progress</button>
      <button @click="jobRejected(n)">Move to Rejected</button>
    </p>
  </div>

  <h3>In Progress</h3>
  <div v-for="(job, n) in getInProgress()" :key="job">
    <p>
      <span class="job">{{ job.link }}</span>
      <button @click="removeJob(n)">Remove</button>
      <button @click="jobApplied(n)">Move to Applied</button>
      <button @click="jobInProgress(n)">Move to In Progress</button>
      <button @click="jobRejected(n)">Move to Rejected</button>
    </p>
  </div>

  <h3>Rejected</h3>
  <div v-for="(job, n) in getRejected()" :key="job">
    <p>
      <span class="job">{{ job.link }}</span>
      <button @click="removeJob(n)">Remove</button>
      <button @click="jobApplied(n)">Move to Applied</button>
      <button @click="jobInProgress(n)">Move to In Progress</button>
      <button @click="jobRejected(n)">Move to Rejected</button>
    </p>
  </div>

  <br />

  <p>
    <input v-model="newJob">
    <button @click="addJob">Add Job</button>
  </p>
</div>


</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}



@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
