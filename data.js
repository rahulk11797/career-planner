// data.js
window.MASTER_QUOTES = [
    "Consistency beats intensity. 1 hour every day > 15 hours once a week.",
    "System Design is the art of choosing which problems you want to have.",
    "Amateurs talk about features. Professionals talk about trade-offs.",
    "Every senior dev was once a junior who didn't quit.",
    "Small steps every day lead to massive results in 90 days.",
    "Your first 1000 LeetCode submissions are the hardest. Keep going.",
    "Design for failure, and you'll build for success.",
    "First, solve the problem. Then, write the code.",
    "Logic is the beginning of wisdom, not the end.",
    "Optimization without measurement is just a guess.",
    "The best way to predict the future is to implement it.",
    "Code is read much more often than it is written.",
    "Complexity is the enemy of reliability.",
    "Master the basics, and the 'advanced' stuff becomes easy.",
    "Learning to learn is the ultimate meta-skill.",
    "Don't practice until you get it right. Practice until you can't get it wrong.",
    "Every 'Time Limit Exceeded' is an opportunity to optimize.",
    "Automation is the key to sanity.",
    "A bug is never just a bug; it's a lesson.",
    "Software is a gas; it expands to fill its container.",
    "Seniority is the depth of your architectural empathy.",
    "Don't build for tomorrow's scale with today's budget.",
    "Deep work is the superpower of the 21st century.",
    "Quality is not an act, it is a habit.",
    "The best refactoring is deleting code.",
    "Simplicity is the ultimate sophistication.",
    "Slow is smooth, smooth is fast.",
    "Knowledge is power, but application is impact.",
    "Errors are proof that you are trying.",
    "Growth happens outside the comfort zone.",
    "Read books. Write code. Build systems.",
    "Mastery is 10,000 hours of deliberate practice.",
    "Focus on the process, not the outcome.",
    "A system is only as strong as its weakest link.",
    "Document your assumptions, not just your code.",
    "The best debugger is a good night's sleep.",
    "Curiosity is the engine of engineering.",
    "Failure is just data.",
    "Be obsessed or be average.",
    "Your potential is endless.",
    "Don't wait for inspiration. Create it.",
    "Every line of code is a liability. Choose wisely.",
    "Understanding is better than memorizing.",
    "Great engineers ask 'Why?' before 'How?'.",
    "Keep your dependencies low and your standards high.",
    "Mastering DSA is about pattern recognition, not memorization.",
    "Consistency is what transforms average into excellence.",
    "A master has failed more times than the beginner has tried.",
    "Build in public. Learn in private.",
    "Don't just fix the bug, fix the process.",
    "Software engineering is a team sport.",
    "The keyboard is mightier than the sword.",
    "Work smart. Build fast. Stay humble.",
    "The only bad question is the one not asked.",
    "Resilience is the key to any 90-day grind.",
    "Focus on fundamentals. The syntax is temporary.",
    "Code doesn't lie. People do.",
    "Master the JVM, and you master the machine.",
    "Your legacy is the systems you leave behind.",
    "Learn. Build. Share. Repeat.",
    "Everything is a trade-off.",
    "Mastery starts today.",
    "Keep going. You're closer than you think.",
    "Don't let what you can't do interfere with what you can do.",
    "The secret of getting ahead is getting started.",
    "Discipline is choosing between what you want now and what you want most.",
    "If you want to go fast, go alone. If you want to go far, go together.",
    "The only way to do great work is to love what you do.",
    "Hard work beats talent when talent doesn't work hard.",
    "You are your only competition.",
    "Stay hungry. Stay foolish. Stay coding.",
    "Ships are safe in the harbor, but that's not what ships are for.",
    "The more you know, the more you realize you don't know.",
    "Think twice, code once.",
    "A goal without a plan is just a wish.",
    "Write code as if the person maintaining it knows where you live.",
    "Success is a series of small wins.",
    "Fear of failure is the enemy of progress.",
    "Stay consistent even when you don't feel like it.",
    "Excellence is not a destination; it's a continuous journey.",
    "Your mind is for having ideas, not holding them.",
    "Solve the problem in your head before touching the keyboard.",
    "The most dangerous phrase is: 'We've always done it this way.'",
    "Great systems are built on simple foundations.",
    "Refactor your life like you refactor your code.",
    "Commitment is doing what you said you would do.",
    "Your future self will thank you for today's grind.",
    "90 days of focus can change your life forever."
];

window.MASTER_DATA = [

/* =========================
   DAYS 1–10 : JVM + DSA CORE
   ========================= */

{
  tasks: [
    { cat: "java", topic: "JVM Architecture, Class Loading, Bytecode, JIT", time: "07:00", link: "https://docs.oracle.com/javase/specs/jvms/se17/html/" },
    { cat: "dsa", topic: "Time & Space Complexity + Big-O Analysis", time: "20:45", link: "https://www.geeksforgeeks.org/dsa/analysis-algorithms-big-o-analysis/" },
    { cat: "system-design", topic: "Scalability Basics, Vertical vs Horizontal", time: "21:35", link: "https://aws.amazon.com/builders-library/horizontal-scaling/" }
  ]
},
{
  tasks: [
    { cat: "java", topic: "Java Memory Model, Happens-Before, Visibility", time: "07:00", link: "https://shipilev.net/blog/2014/jmm-pragmatics/" },
    { cat: "dsa", topic: "Arrays & Prefix Sum Pattern", time: "20:45", link: "https://leetcode.com/problems/subarray-sum-equals-k/" },
    { cat: "system-design", topic: "Latency vs Throughput + Percentiles", time: "21:35", link: "https://aws.amazon.com/builders-library/latency-and-throughput/" }
  ]
},
{
  tasks: [
    { cat: "java", topic: "Object Memory Layout, Escape Analysis, TLAB", time: "07:00", link: "https://openjdk.org/groups/hotspot/docs/HotSpotGlossary.html" },
    { cat: "dsa", topic: "Sliding Window (Fixed & Variable)", time: "20:45", link: "https://leetcode.com/problems/sliding-window-maximum/" },
    { cat: "system-design", topic: "Load Balancing (L4 vs L7)", time: "21:35", link: "https://www.nginx.com/resources/glossary/load-balancing/" }
  ]
},
{
  tasks: [
    { cat: "java", topic: "Garbage Collectors: Serial, CMS, G1, ZGC", time: "07:00", link: "https://docs.oracle.com/en/java/javase/17/gctuning/" },
    { cat: "dsa", topic: "Two Pointers & In-place Problems", time: "20:45", link: "https://leetcode.com/problems/trapping-rain-water/" },
    { cat: "system-design", topic: "Consistent Hashing", time: "21:35", link: "https://www.educative.io/blog/consistent-hashing" }
  ]
},
{
  tasks: [
    { cat: "java", topic: "GC Logs, Heap Sizing, JVM Flags", time: "07:00", link: "https://docs.oracle.com/en/java/javase/17/gctuning/garbage-collection-tuning.html" },
    { cat: "dsa", topic: "Hashing & HashMap Internals", time: "20:45", link: "https://leetcode.com/problems/two-sum/" },
    { cat: "system-design", topic: "CAP Theorem (Real Systems)", time: "21:35", link: "https://www.ibm.com/topics/cap-theorem" }
  ]
},
{
  tasks: [
    { cat: "java", topic: "synchronized, volatile, Atomic Variables", time: "07:00", link: "https://docs.oracle.com/javase/tutorial/essential/concurrency/" },
    { cat: "dsa", topic: "Stack & Monotonic Stack", time: "20:45", link: "https://leetcode.com/problems/daily-temperatures/" },
    { cat: "system-design", topic: "PACELC & Trade-offs", time: "21:35", link: "https://dbms-not-only-sql.blogspot.com/2012/12/pacelc-theorem.html" }
  ]
},
{
  tasks: [
    { cat: "java", topic: "Locks, ReentrantLock, Deadlocks, Starvation", time: "07:00", link: "https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/locks/package-summary.html" },
    { cat: "dsa", topic: "Binary Search Patterns", time: "20:45", link: "https://leetcode.com/problems/koko-eating-bananas/" },
    { cat: "system-design", topic: "Rate Limiting Algorithms", time: "21:35", link: "https://konghq.com/blog/engineering/rate-limiting-algorithms" }
  ]
},
{
  tasks: [
    { cat: "java", topic: "ThreadPoolExecutor & ForkJoinPool", time: "07:00", link: "https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/ThreadPoolExecutor.html" },
    { cat: "dsa", topic: "Linked List Patterns & Cycle Detection", time: "20:45", link: "https://leetcode.com/problems/linked-list-cycle-ii/" },
    { cat: "system-design", topic: "Caching, Eviction, Cache Stampede", time: "21:35", link: "https://martinfowler.com/bliki/CacheInvalidation.html" }
  ]
},
{
  tasks: [
    { cat: "java", topic: "CompletableFuture Internals & Pitfalls", time: "07:00", link: "https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/CompletableFuture.html" },
    { cat: "dsa", topic: "Recursion & Backtracking", time: "20:45", link: "https://leetcode.com/problems/subsets/" },
    { cat: "database", topic: "Indexes, Query Plans, Covering Index", time: "21:35", link: "https://use-the-index-luke.com/" }
  ]
},
{
  tasks: [
    { cat: "java", topic: "Java NIO, Blocking vs Non-blocking IO", time: "07:00", link: "https://docs.oracle.com/javase/tutorial/essential/io/nonblocking.html" },
    { cat: "dsa", topic: "Tree Traversals & Views", time: "20:45", link: "https://leetcode.com/problems/binary-tree-level-order-traversal/" },
    { cat: "system-design", topic: "Database Scaling Basics", time: "21:35", link: "https://www.educative.io/blog/database-scaling" }
  ]
},

/* =========================
   DAYS 11–30 : DSA + SPRING
   ========================= */

{
  tasks: [
    { cat: "java", topic: "Spring Boot Auto-Configuration & @EnableAutoConfiguration Internals", time: "07:00", link: "https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.developing-auto-configuration" },
    { cat: "dsa", topic: "Heap & Priority Queue Fundamentals", time: "20:45", link: "https://leetcode.com/problems/top-k-frequent-elements/" },
    { cat: "database", topic: "SQL vs NoSQL – Use-case Driven Decisions", time: "21:35", link: "https://aws.amazon.com/nosql/" }
  ]
},
{
  tasks: [
    { cat: "java", topic: "Spring Bean Lifecycle, @PostConstruct, @PreDestroy", time: "07:00", link: "https://docs.spring.io/spring-framework/reference/core/beans/factory-nature.html" },
    { cat: "dsa", topic: "Binary Heap Problems & K-way Merge", time: "20:45", link: "https://leetcode.com/problems/merge-k-sorted-lists/" },
    { cat: "system-design", topic: "Message Queues Basics (Kafka vs SQS vs RabbitMQ)", time: "21:35", link: "https://aws.amazon.com/message-queue/" }
  ]
},
{
  tasks: [
    { cat: "java", topic: "Spring Proxies: JDK vs CGLIB", time: "07:00", link: "https://docs.spring.io/spring-framework/reference/core/aop/proxying.html" },
    { cat: "dsa", topic: "Tree Traversals – DFS Variants", time: "20:45", link: "https://leetcode.com/problems/binary-tree-inorder-traversal/" },
    { cat: "system-design", topic: "At-least-once vs Exactly-once Delivery", time: "21:35", link: "https://www.confluent.io/blog/exactly-once-semantics-are-possible-heres-how/" }
  ]
},
{
  tasks: [
    { cat: "java", topic: "Self-invocation Problem & Transaction Boundaries", time: "07:00", link: "https://docs.spring.io/spring-framework/reference/data-access/transaction/declarative.html" },
    { cat: "dsa", topic: "Tree Views (Left, Right, Top, Bottom)", time: "20:45", link: "https://leetcode.com/problems/binary-tree-right-side-view/" },
    { cat: "database", topic: "ACID Properties & Isolation Levels (Real DBs)", time: "21:35", link: "https://www.postgresql.org/docs/current/transaction-iso.html" }
  ]
},
{
  tasks: [
    { cat: "java", topic: "@Transactional Propagation & Rollback Rules", time: "07:00", link: "https://docs.spring.io/spring-framework/reference/data-access/transaction/declarative/annotations.html" },
    { cat: "dsa", topic: "Binary Search on Answer Pattern", time: "20:45", link: "https://leetcode.com/problems/split-array-largest-sum/" },
    { cat: "system-design", topic: "Database Indexing Strategy & Trade-offs", time: "21:35", link: "https://use-the-index-luke.com/sql/preface" }
  ]
},
{
  tasks: [
    { cat: "java", topic: "Exception Handling in Spring & Controller Advice", time: "07:00", link: "https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-exceptionhandler.html" },
    { cat: "dsa", topic: "Graph Basics – BFS & DFS", time: "20:45", link: "https://leetcode.com/problems/number-of-islands/" },
    { cat: "system-design", topic: "Database Connection Pooling (HikariCP)", time: "21:35", link: "https://github.com/brettwooldridge/HikariCP#frequently-used" }
  ]
},
{
  tasks: [
    { cat: "java", topic: "Spring Boot Configuration: application.yml & Profiles", time: "07:00", link: "https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.external-config" },
    { cat: "dsa", topic: "Topological Sort (BFS + DFS)", time: "20:45", link: "https://leetcode.com/problems/course-schedule/" },
    { cat: "system-design", topic: "Schema Design & Normalization vs Denormalization", time: "21:35", link: "https://martinfowler.com/articles/schemaless.html" }
  ]
},
{
  tasks: [
    { cat: "java", topic: "Spring Boot Actuator & Health Checks", time: "07:00", link: "https://docs.spring.io/spring-boot/docs/current/reference/html/actuator.html" },
    { cat: "dsa", topic: "Union-Find (DSU) with Path Compression", time: "20:45", link: "https://leetcode.com/problems/number-of-provinces/" },
    { cat: "system-design", topic: "Leader Election & Coordination Basics", time: "21:35", link: "https://zookeeper.apache.org/doc/current/zookeeperOver.html" }
  ]
},
{
  tasks: [
    { cat: "java", topic: "Spring Security Basics & Filter Chain", time: "07:00", link: "https://docs.spring.io/spring-security/reference/servlet/architecture.html" },
    { cat: "dsa", topic: "Greedy Algorithms – Interval Scheduling", time: "20:45", link: "https://leetcode.com/problems/non-overlapping-intervals/" },
    { cat: "system-design", topic: "Authentication vs Authorization", time: "21:35", link: "https://auth0.com/docs/get-started/authentication-and-authorization" }
  ]
},
{
  tasks: [
    { cat: "java", topic: "Spring Boot Thread Safety & Bean Scopes", time: "07:00", link: "https://docs.spring.io/spring-framework/reference/core/beans/factory-scopes.html" },
    { cat: "dsa", topic: "Interval Merge & Sweep Line", time: "20:45", link: "https://leetcode.com/problems/merge-intervals/" },
    { cat: "system-design", topic: "JWT, Sessions & Token Expiry", time: "21:35", link: "https://jwt.io/introduction" }
  ]
},
{
  tasks: [
    { cat: "java", topic: "REST API Design Best Practices", time: "07:00", link: "https://restfulapi.net/" },
    { cat: "dsa", topic: "Dynamic Programming – 1D DP Basics", time: "20:45", link: "https://leetcode.com/problems/house-robber/" },
    { cat: "system-design", topic: "API Versioning & Backward Compatibility", time: "21:35", link: "https://stripe.com/blog/api-versioning" }
  ]
},
{
  tasks: [
    { cat: "java", topic: "Idempotency in REST APIs", time: "07:00", link: "https://stripe.com/docs/idempotency" },
    { cat: "dsa", topic: "Dynamic Programming – Knapsack Pattern", time: "20:45", link: "https://leetcode.com/problems/partition-equal-subset-sum/" },
    { cat: "system-design", topic: "Retry, Timeout & Circuit Breaker", time: "21:35", link: "https://martinfowler.com/bliki/CircuitBreaker.html" }
  ]
},
{
  tasks: [
    { cat: "java", topic: "Spring Boot Testing – @SpringBootTest vs @WebMvcTest", time: "07:00", link: "https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.testing" },
    { cat: "dsa", topic: "Dynamic Programming – LIS Pattern", time: "20:45", link: "https://leetcode.com/problems/longest-increasing-subsequence/" },
    { cat: "system-design", topic: "Service-to-Service Communication", time: "21:35", link: "https://aws.amazon.com/builders-library/service-communication/" }
  ]
},
{
  tasks: [
    { cat: "java", topic: "Spring Boot Performance Anti-patterns", time: "07:00", link: "https://www.baeldung.com/spring-boot-performance" },
    { cat: "dsa", topic: "Bit Manipulation Basics", time: "20:45", link: "https://leetcode.com/problems/single-number/" },
    { cat: "system-design", topic: "Synchronous vs Asynchronous Communication", time: "21:35", link: "https://www.confluent.io/learn/asynchronous-communication/" }
  ]
},
{
  tasks: [
    { cat: "java", topic: "Spring Boot Production Readiness Checklist", time: "07:00", link: "https://12factor.net/" },
    { cat: "dsa", topic: "DP – Coin Change & Counting Ways", time: "20:45", link: "https://leetcode.com/problems/coin-change/" },
    { cat: "system-design", topic: "Design Read-heavy vs Write-heavy Systems", time: "21:35", link: "https://aws.amazon.com/builders-library/read-heavy-workloads/" }
  ]
},
{
  tasks: [
    { cat: "java", topic: "Spring Boot Interview Traps & FAQs", time: "07:00", link: "https://www.baeldung.com/spring-interview-questions" },
    { cat: "dsa", topic: "Mixed Pattern Revision (Trees + Graphs)", time: "20:45", link: "https://leetcode.com/problems/binary-tree-maximum-path-sum/" },
    { cat: "system-design", topic: "Failure Handling & Graceful Degradation", time: "21:35", link: "https://aws.amazon.com/builders-library/handling-failures/" }
  ]
},
{
  tasks: [
    { cat: "interview", topic: "Mock DSA Interview (Trees & Graphs)", time: "07:00", link: "https://leetcode.com/contest/" },
    { cat: "interview", topic: "Spring Boot Mock Interview", time: "20:45", link: "https://github.com/spring-projects/spring-boot" },
    { cat: "revision", topic: "Consolidation & Weak Area Notes", time: "21:35", link: "https://www.notion.so/" }
  ]
},

/* =========================
   DAYS 31–60 : SENIOR DEPTH
   ========================= */

{
  tasks: [
    { cat: "java", topic: "JVM Safepoints, Stop-the-World & Bias Locking", time: "07:00", link: "https://openjdk.org/groups/hotspot/docs/HotSpotGlossary.html" },
    { cat: "dsa", topic: "Intervals – Merge, Overlap & Scheduling", time: "20:45", link: "https://leetcode.com/problems/merge-intervals/" },
    { cat: "system-design", topic: "Back-of-the-Envelope Estimation (QPS, Storage)", time: "21:35", link: "https://www.educative.io/blog/back-of-the-envelope-estimation" }
  ]
},
{
  tasks: [
    { cat: "java", topic: "JVM GC Pauses, Latency SLAs & Throughput Trade-offs", time: "07:00", link: "https://docs.oracle.com/en/java/javase/17/gctuning/" },
    { cat: "dsa", topic: "Greedy – Activity Selection & Job Scheduling", time: "20:45", link: "https://leetcode.com/problems/non-overlapping-intervals/" },
    { cat: "system-design", topic: "Traffic Estimation & Capacity Planning", time: "21:35", link: "https://aws.amazon.com/builders-library/capacity-planning/" }
  ]
},
{
  tasks: [
    { cat: "java", topic: "Thread Contention, False Sharing & CPU Caches", time: "07:00", link: "https://shipilev.net/blog/2014/false-sharing/" },
    { cat: "dsa", topic: "Greedy – Minimum Platforms & Jump Game", time: "20:45", link: "https://leetcode.com/problems/jump-game/" },
    { cat: "system-design", topic: "Design for High Availability (Active-Active)", time: "21:35", link: "https://aws.amazon.com/builders-library/high-availability/" }
  ]
},
{
  tasks: [
    { cat: "java", topic: "Async Systems: CompletableFuture vs Reactive Streams", time: "07:00", link: "https://www.reactive-streams.org/" },
    { cat: "dsa", topic: "Advanced Binary Search (Lower/Upper Bounds)", time: "20:45", link: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/" },
    { cat: "system-design", topic: "Designing Idempotent Systems", time: "21:35", link: "https://aws.amazon.com/builders-library/making-retries-safe-with-idempotence/" }
  ]
},
{
  tasks: [
    { cat: "java", topic: "ForkJoinPool Internals & Work-Stealing", time: "07:00", link: "https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/ForkJoinPool.html" },
    { cat: "dsa", topic: "DP on Subsets (State Compression)", time: "20:45", link: "https://leetcode.com/problems/partition-to-k-equal-sum-subsets/" },
    { cat: "system-design", topic: "Consistency Models in Distributed Systems", time: "21:35", link: "https://jepsen.io/consistency" }
  ]
},
{
  tasks: [
    { cat: "java", topic: "Java Profiling: JFR, JMC, Async Profiler", time: "07:00", link: "https://docs.oracle.com/javacomponents/jmc.htm" },
    { cat: "dsa", topic: "DP on Strings – Edit Distance", time: "20:45", link: "https://leetcode.com/problems/edit-distance/" },
    { cat: "system-design", topic: "Read Replicas, Replication Lag", time: "21:35", link: "https://aws.amazon.com/builders-library/replication-lag/" }
  ]
},
{
  tasks: [
    { cat: "java", topic: "Heap Dump & Thread Dump Analysis", time: "07:00", link: "https://docs.oracle.com/javase/8/docs/technotes/tools/unix/jmap.html" },
    { cat: "dsa", topic: "DP on Trees – Max Path Sum", time: "20:45", link: "https://leetcode.com/problems/binary-tree-maximum-path-sum/" },
    { cat: "system-design", topic: "Sharding Strategies & Hot Partitions", time: "21:35", link: "https://aws.amazon.com/builders-library/sharding/" }
  ]
},
{
  tasks: [
    { cat: "java", topic: "Spring Async, @Async Pitfalls & Thread Pools", time: "07:00", link: "https://docs.spring.io/spring-framework/reference/integration/scheduling.html" },
    { cat: "dsa", topic: "DP – Unbounded Knapsack Variants", time: "20:45", link: "https://leetcode.com/problems/coin-change/" },
    { cat: "system-design", topic: "Distributed Locks (Zookeeper / Redis)", time: "21:35", link: "https://redis.io/docs/latest/develop/use/patterns/distributed-locks/" }
  ]
},
{
  tasks: [
    { cat: "java", topic: "Reactive Systems: Backpressure & Threading", time: "07:00", link: "https://projectreactor.io/docs/core/release/reference/" },
    { cat: "dsa", topic: "Advanced Graphs – Shortest Path (Dijkstra)", time: "20:45", link: "https://leetcode.com/problems/network-delay-time/" },
    { cat: "system-design", topic: "Eventual Consistency & Compensation", time: "21:35", link: "https://microservices.io/patterns/data/saga.html" }
  ]
},
{
  tasks: [
    { cat: "java", topic: "Spring Boot Memory Leaks & Common Anti-patterns", time: "07:00", link: "https://www.baeldung.com/java-memory-leaks" },
    { cat: "dsa", topic: "Graph – Union Find + Kruskal MST", time: "20:45", link: "https://leetcode.com/problems/min-cost-to-connect-all-points/" },
    { cat: "system-design", topic: "Kafka Architecture & Internals", time: "21:35", link: "https://kafka.apache.org/documentation/" }
  ]
},
{
  tasks: [
    { 
      cat: "system-design",
      topic: "Kafka Producers, Consumers & Rebalancing",
      time: "07:00",
      link: "https://kafka.apache.org/documentation/#consumerconfigs"
    },
    { 
      cat: "dsa",
      topic: "Graph – Topological DP",
      time: "20:45",
      link: "https://leetcode.com/problems/longest-path-in-a-directed-acyclic-graph/"
    },
    { 
      cat: "system-design",
      topic: "Exactly-once vs At-least-once Semantics",
      time: "21:35",
      link: "https://www.confluent.io/blog/exactly-once-semantics-are-possible-heres-how/"
    }
  ]
},

{
  tasks: [
    { cat: "database", topic: "Redis Internals, Eviction & Persistence", time: "07:00", link: "https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/" },
    { cat: "dsa", topic: "Sliding Window – Hard Variants", time: "20:45", link: "https://leetcode.com/problems/minimum-window-substring/" },
    { cat: "system-design", topic: "Cache Consistency & Write Strategies", time: "21:35", link: "https://aws.amazon.com/builders-library/caching-challenges-and-strategies/" }
  ]
},
{
  tasks: [
    { cat: "database", topic: "Database Sharding vs Partitioning", time: "07:00", link: "https://www.cockroachlabs.com/blog/sharding-vs-partitioning/" },
    { cat: "dsa", topic: "Advanced Greedy – Gas Station, Candy", time: "20:45", link: "https://leetcode.com/problems/gas-station/" },
    { cat: "system-design", topic: "Designing for Multi-region Deployment", time: "21:35", link: "https://aws.amazon.com/builders-library/global-services/" }
  ]
},
{
  tasks: [
    { cat: "devops", topic: "Docker Internals, Layers & Image Optimization", time: "07:00", link: "https://docs.docker.com/build/building/best-practices/" },
    { cat: "dsa", topic: "Advanced DP – Matrix Chain & Palindrome", time: "20:45", link: "https://leetcode.com/problems/longest-palindromic-substring/" },
    { cat: "system-design", topic: "Blue-Green & Canary Deployments", time: "21:35", link: "https://martinfowler.com/bliki/BlueGreenDeployment.html" }
  ]
},
{
  tasks: [
    { cat: "devops", topic: "Kubernetes Pods, Services, ConfigMaps, Secrets", time: "07:00", link: "https://kubernetes.io/docs/concepts/" },
    { cat: "dsa", topic: "DP – Partition & Subset Problems", time: "20:45", link: "https://leetcode.com/problems/partition-equal-subset-sum/" },
    { cat: "system-design", topic: "Service Discovery & Load Balancing", time: "21:35", link: "https://kubernetes.io/docs/concepts/services-networking/service/" }
  ]
},
{
  tasks: [
    { cat: "devops", topic: "Kubernetes Scaling, HPA & Resource Limits", time: "07:00", link: "https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/" },
    { cat: "dsa", topic: "String Hashing & Rolling Hash", time: "20:45", link: "https://leetcode.com/problems/repeated-dna-sequences/" },
    { cat: "observability", topic: "Metrics, Logs, Traces (RED, USE)", time: "21:35", link: "https://sre.google/sre-book/monitoring-distributed-systems/" }
  ]
},
{
  tasks: [
    { cat: "observability", topic: "JVM Metrics, GC Metrics & Alerts", time: "07:00", link: "https://micrometer.io/docs" },
    { cat: "dsa", topic: "Hard Mixed DP Revision", time: "20:45", link: "https://leetcode.com/problems/burst-balloons/" },
    { cat: "system-design", topic: "SLOs, SLIs & Error Budgets", time: "21:35", link: "https://sre.google/sre-book/service-level-objectives/" }
  ]
},
{
  tasks: [
    { cat: "observability", topic: "Production Incident Debugging (Case Studies)", time: "07:00", link: "https://sre.google/sre-book/postmortem-culture/" },
    { cat: "interview", topic: "Mock System Design Interview (Senior)", time: "20:45", link: "https://www.educative.io/courses/grokking-the-system-design-interview" },
    { cat: "revision", topic: "Consolidation & Weak Area Fixes", time: "21:35", link: "https://www.notion.so/" }
  ]
},
/* =========================
   DAYS 61–90 : INTERVIEW MODE
   ========================= */

{
  tasks: [
    { cat: "system-design", topic: "System Design Framework: Requirements, Estimation, Trade-offs", time: "07:00", link: "https://www.educative.io/blog/how-to-crack-system-design-interview" },
    { cat: "dsa", topic: "Mixed DSA Mock (Arrays + Hashing)", time: "20:45", link: "https://leetcode.com/problems/subarray-sum-equals-k/" },
    { cat: "interview", topic: "Interview Communication & Thought Process", time: "21:35", link: "https://www.youtube.com/watch?v=G7nG0cXc1G4" }
  ]
},
{
  tasks: [
    { cat: "system-design", topic: "Design URL Shortener (TinyURL)", time: "07:00", link: "https://www.educative.io/courses/grokking-the-system-design-interview" },
    { cat: "dsa", topic: "Mock DSA – Sliding Window + Two Pointers", time: "20:45", link: "https://leetcode.com/problems/minimum-window-substring/" },
    { cat: "interview", topic: "System Design Evaluation Criteria", time: "21:35", link: "https://martinfowler.com/articles/design-review.html" }
  ]
},
{
  tasks: [
    { cat: "system-design", topic: "Design Rate Limiter", time: "07:00", link: "https://aws.amazon.com/builders-library/rate-limiting-strategies/" },
    { cat: "dsa", topic: "Mock DSA – Stack & Monotonic Stack", time: "20:45", link: "https://leetcode.com/problems/largest-rectangle-in-histogram/" },
    { cat: "interview", topic: "Handling Follow-up Questions in Interviews", time: "21:35", link: "https://www.interviewbit.com/blog/system-design-interview-questions/" }
  ]
},
{
  tasks: [
    { cat: "system-design", topic: "Design Notification System (Email / Push / SMS)", time: "07:00", link: "https://www.educative.io/blog/notification-system-design" },
    { cat: "dsa", topic: "Mock DSA – Trees", time: "20:45", link: "https://leetcode.com/problems/binary-tree-maximum-path-sum/" },
    { cat: "interview", topic: "STAR Method for Behavioral Interviews", time: "21:35", link: "https://www.themuse.com/advice/star-interview-method" }
  ]
},
{
  tasks: [
    { cat: "system-design", topic: "Design WhatsApp / Chat System", time: "07:00", link: "https://www.youtube.com/watch?v=vvhC64hQZMk" },
    { cat: "dsa", topic: "Mock DSA – Graphs (BFS / DFS)", time: "20:45", link: "https://leetcode.com/problems/number-of-islands/" },
    { cat: "interview", topic: "Behavioral: Conflict, Failure & Ownership", time: "21:35", link: "https://www.levels.fyi/blog/amazon-leadership-principles.html" }
  ]
},
{
  tasks: [
    { cat: "system-design", topic: "Design News Feed / Instagram Feed", time: "07:00", link: "https://www.educative.io/blog/news-feed-system-design" },
    { cat: "dsa", topic: "Mock DSA – Heaps & Greedy", time: "20:45", link: "https://leetcode.com/problems/task-scheduler/" },
    { cat: "interview", topic: "Explaining Trade-offs Clearly", time: "21:35", link: "https://aws.amazon.com/builders-library/trade-offs/" }
  ]
},
{
  tasks: [
    { cat: "system-design", topic: "Design Payment System", time: "07:00", link: "https://stripe.com/blog/payment-processing" },
    { cat: "dsa", topic: "Mock DSA – Dynamic Programming", time: "20:45", link: "https://leetcode.com/problems/coin-change/" },
    { cat: "interview", topic: "Behavioral: Decision Making Under Pressure", time: "21:35", link: "https://hbr.org/2018/09/how-to-make-decisions-under-pressure" }
  ]
},
{
  tasks: [
    { cat: "system-design", topic: "Design Ride Sharing System (Uber / Ola)", time: "07:00", link: "https://www.educative.io/blog/uber-system-design" },
    { cat: "dsa", topic: "Mock DSA – Intervals", time: "20:45", link: "https://leetcode.com/problems/merge-intervals/" },
    { cat: "interview", topic: "Answering ‘Why this design?’ Questions", time: "21:35", link: "https://www.youtube.com/watch?v=ZgdS0EUmn70" }
  ]
},
{
  tasks: [
    { cat: "system-design", topic: "Design Search Autocomplete", time: "07:00", link: "https://www.educative.io/blog/search-autocomplete-system-design" },
    { cat: "dsa", topic: "Mock DSA – Bit Manipulation", time: "20:45", link: "https://leetcode.com/problems/single-number/" },
    { cat: "interview", topic: "Resume Deep Dive Preparation", time: "21:35", link: "https://www.interviewkickstart.com/blog/how-to-prepare-for-resume-based-interviews" }
  ]
},
{
  tasks: [
    { cat: "system-design", topic: "Design File Storage (Google Drive)", time: "07:00", link: "https://www.educative.io/blog/google-drive-system-design" },
    { cat: "dsa", topic: "Mock DSA – Mixed Hard Problems", time: "20:45", link: "https://leetcode.com/problems/burst-balloons/" },
    { cat: "interview", topic: "Behavioral: Leadership Without Authority", time: "21:35", link: "https://www.mindtools.com/ak9k4xf/leadership-without-authority" }
  ]
},
{
  tasks: [
    { cat: "interview", topic: "Full Mock Java Interview (Core + Spring)", time: "07:00", link: "https://www.baeldung.com/java-interview-questions" },
    { cat: "interview", topic: "Full Mock DSA Interview (Timed)", time: "20:45", link: "https://leetcode.com/contest/" },
    { cat: "revision", topic: "Mistake Log & Weak Area Fix", time: "21:35", link: "https://www.notion.so/" }
  ]
},
{
  tasks: [
    { cat: "interview", topic: "Full Mock System Design Interview", time: "07:00", link: "https://www.educative.io/courses/grokking-the-system-design-interview" },
    { cat: "interview", topic: "Behavioral Mock (STAR)", time: "20:45", link: "https://www.pramp.com/" },
    { cat: "revision", topic: "Design Template Finalization", time: "21:35", link: "https://www.notion.so/" }
  ]
},
{
  tasks: [
    { cat: "revision", topic: "DSA Full Revision (All Patterns)", time: "07:00", link: "https://leetcode.com/problemset/all/" },
    { cat: "revision", topic: "Java & Spring Quick Revision Notes", time: "20:45", link: "https://docs.spring.io/spring-boot/docs/current/reference/html/" },
    { cat: "interview", topic: "HR & Salary Negotiation Prep", time: "21:35", link: "https://haseebq.com/my-ten-rules-for-negotiating-a-job-offer/" }
  ]
},
{
  tasks: [
    { cat: "revision", topic: "System Design Final Revision", time: "07:00", link: "https://aws.amazon.com/builders-library/" },
    { cat: "interview", topic: "Offer Comparison & Decision Framework", time: "20:45", link: "https://www.levels.fyi/blog/how-to-evaluate-job-offers/" },
    { cat: "interview", topic: "Confidence, Mindset & Interview Day Strategy", time: "21:35", link: "https://www.youtube.com/watch?v=5MgBikgcWnY" }
  ]
}

];



window.SIDEBAR_LINKS = [
  {
    name: "LeetCode Solver",
    link: "https://leetcode.com",
    icon: "fa-code",
    color: "text-warning"
  },
  {
    name: "System Design (ByteByteGo)",
    link: "https://bytebytego.com",
    icon: "fa-diagram-project",
    color: "text-info"
  },
  {
    name: "Java Internals (Baeldung)",
    link: "https://www.baeldung.com",
    icon: "fa-mug-hot",
    color: "text-primary"
  },
  {
    name: "Namaste Dev (JS / FE)",
    link: "https://namastedev.com",
    icon: "fa-play",
    color: "text-danger"
  },
  {
    name: "GitHub Prep",
    link: "https://github.com",
    icon: "fa-brands fa-github",
    color: "text-white"
  },

  /* ===== Interview Ready ===== */

  {
    name: "System Design Interview",
    link: "https://aws.amazon.com/builders-library/",
    icon: "fa-sitemap",
    color: "text-success"
  },
  {
    name: "Mock Interviews (Pramp)",
    link: "https://www.pramp.com",
    icon: "fa-user-check",
    color: "text-info"
  },
  {
    name: "Behavioral (STAR)",
    link: "https://www.levels.fyi/blog/amazon-leadership-principles.html",
    icon: "fa-comments",
    color: "text-secondary"
  },
  {
    name: "Salary & Offers",
    link: "https://www.levels.fyi",
    icon: "fa-money-bill-trend-up",
    color: "text-success"
  }
];
