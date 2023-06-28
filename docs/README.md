---
layout: home
permalink: index.html

# Please update this with your repository name and title
repository-name: e17-4yp-Virtual-Patient-Simulator-for-Skill-Training-in-Dentistry
title: Virtual Patient Simulator for Skill Training in Dentistry
---

[comment]: # "This is the standard layout for the project, but you can clean this and use your own template"

# Virtual Patient Simulator for Skill Training in Dentistry

#### Team

- E/17/005, Rishard.M.I., [email](mailto:e17005@eng.pdn.ac.lk)
- E/17/327, Shalha.A.M.F., [email](mailto:e17327@eng.pdn.ac.lk)
- E/17/379, Weerasinghe.S.P.D.D.S., [email](mailto:e17379@eng.pdn.ac.lk)

#### Supervisors

- Prof. Roshan G. Ragel, [email](mailto:roshanr@eng.pdn.ac.lk)
- Dr. Upul Jayasinghe , [email](mailto:upuljm@eng.pdn.ac.lk)
- Dr. D Leuke Bandara , [email](mailto:dhanulb@dental.pdn.ac.lk)
- Dr. Titus Jayarathna , [email](mailto:titus@eng.pdn.ac.lk)

#### Table of content

1. [Abstract](#abstract)
2. [Related works](#related-works)
3. [Methodology](#methodology)
4. [Experiment Setup and Implementation](#experiment-setup-and-implementation)
5. [Results and Analysis](#results-and-analysis)
6. [Conclusion](#conclusion)
7. [Publications](#publications)
8. [Links](#links)

---

## Abstract
Explore the potential of integrating Virtual Reality (VR) and Artificial Intelligence (AI) techniques to increase the effectiveness of skill training in dentistry by providing personalised instruction, assessment and formative feedback in a form and on a scale not possible in the physical world. The systems being built promise to provide dental students with an increased amount of guided practice at a relatively low cost.
---
## Related works

#### 1. **Game Engines in Medical Simulations**

The literature emphasizes a growing demand for affordable, high-realism virtual simulations in medical and dental education. The scarcity and high cost of commercial training tools have led to exploring alternative solutions such as game engines, advanced software systems that create highly interactive environments. Despite their potential, the use of game engines within medical education remains largely underexplored.

Functional units of these systems, like Graphics, AI, and Physics engines, offer notable advantages. The Graphics engine, in particular, is pivotal in developing 3D models, providing a more accessible platform for developers than web-based technologies. However, selecting an optimal game engine requires careful evaluation of various factors including stability, custom content creation potential, and capacity for custom medical model creation.

The literature analysis compares four renowned game engines - Unreal Engine 2, idTech 4, Source Engine, and Unity Engine. All have distinct characteristics concerning editing, content creation, and gameplay. Among them, Unity3D and Unreal Engine are most suitable for clinical simulations. Unity3D, with its extensive user base, robust 3D graphic support, platform compatibility, fair pricing, and an extensive asset store, appears most fitting for implementing a virtual simulator for clinical practices.

Although the existing literature identifies the potential of game engines in medical education, there's a significant gap in their application. To bridge this gap, the proposal is to use Unity3D to develop a virtual patient simulator, leveraging its demonstrated potential in VR training simulators. This would greatly contribute to filling the identified research gap and promoting the integration of game engine technology in medical education.

#### 2.  **Haptic-Based Virtual Simulators in Dentistry**

Haptic-based virtual simulators are a groundbreaking answer to some of the challenges in dental education. These simulators use touch-based technology to supplement visual aids, like 3D images, giving students a more realistic learning environment. Traditional teaching methods, like text or spoken explanations, can't fully describe the feeling of dental procedures, but haptic simulators fill this gap. They help improve students' practical skills while being cost-effective, easy to maintain, and long-lasting.

Three key examples of these systems are the DentSim system, the MOOG Simodont Dental Trainer, and the PerioSim haptic system. DentSim is a computer-aided dental simulator providing visual, audio, and practical inputs for a well-rounded learning experience. It tracks a student's progress in tasks like tooth preparation with immediate on-screen feedback.

In contrast, the MOOG Simodont Dental Trainer doesn't use a physical model head. It shows a 3D image of the patient's mouth and tooth, providing tactile feedback through a drill handle that responds to the student's movements.

Finally, the PerioSim haptic system offers specialized training for periodontal procedures, displaying a 3D model of the human mouth. Each of these systems offers unique benefits and different approaches to tactile feedback, creating a comprehensive learning experience covering various aspects of dental education.

However, using these systems individually may limit the overall training experience. A better approach might be to integrate these technologies into one virtual patient simulator, providing a more engaging, realistic training environment for dental students, enhancing their tactile experience, and improving their practical skills.


#### 3.  **Virtual Reality Training Simulator in Dentistry**

Virtual Reality Training Simulators (VRTS) are increasingly beneficial in dental education, allowing students to practice procedures in a realistic but virtual environment. One such VRTS uses touch-based technology, 3D software, and a special VR headset to convert medical images into 3D models students can interact with. This innovative approach offers a real-life experience using fewer resources, doesn't require continuous supervision, and still enables effective tracking of student progress.

In a similar vein, the "Intelligent Virtual Training Environment for Dental Surgery" project combines VR with Artificial Intelligence to enhance surgical training. The project focuses on providing personalized instruction, assessment, and feedback on a large scale. It includes a VR dental simulator, an intelligent tutoring system, and an accessible VR simulator for emergency management in dental surgery, all aiming to improve dental training through accessibility, increased practice opportunities, and advanced learning techniques.

Other VR technologies like Oculus Quest have shown potential in various areas such as addressing specific phobias, aiding in physical rehabilitation, and improving the administration of local anesthesia. Research suggests VR simulators can significantly enhance practical skills among students, showing potential to revolutionize education, healthcare, and psychological treatments.

However, using VR simulators also comes with challenges, including the need to validate the simulator's evaluation system, accurately predict students' skills, and compare its performance with other VR training systems. Further research in these areas will help optimize the use of VR simulators in dental education.

In addition to touch-based simulators, web-based systems utilizing Virtual Patients (VP) are gaining interest. They provide interactive scenarios and realistic patient encounters, offering a flexible and accessible platform for learners to practice clinical decision-making, diagnostic skills, and treatment planning.

#### 4.  **Problem-Based Learning in Virtual Patient Skill Training**

Problem-Based Learning (PBL) plays an essential role in virtual patient skill training. This student-focused method encourages active learning by introducing students to real-world scenarios, improving problem-solving and data analysis skills. However, traditional PBL methods often require significant personal attention from tutors, presenting a challenge due to resource and faculty constraints.

Traditional paper-based PBL methods can limit students' learning pathways, restricting their ability to make independent decisions and learn from their outcomes. As such, more modern approaches to PBL are leaning towards interactive, visually engaging methods, allowing students to experience different decision outcomes in a way that mirrors real-life situations. This not only provides a safe practice environment but also exposes students to rare diseases, enhancing their decision-making skills.

Studies suggest a correlation between PBL practice and improved exam performance, showing the effectiveness of virtual training platforms integrated with PBL in medical education. However, there is still a need for a more extensive range of dental cases within the PBL framework.

Artificial intelligence can be a significant game-changer in this field. An AI chatbot in the virtual patient simulator can expand the range of scenarios and provide a controlled, engaging, and safe learning environment. This system could efficiently engage students comfortable with digital technology, making it easier for them to adapt to technological advancements in their field. This strategy could bridge the gap in current PBL methods, providing a comprehensive, dynamic, and interactive learning experience for students in dental education.
---

## Methodology

### 3D Patient Simulator

#### Existing System 
- Intra oral view of a mouth
  
### Enhancement to the system

#### Interactive 3D Dental Room Model: 
- Develop a 3D model of a dental clinic, complete with all necessary instruments, for a more realistic user experience.

##### Instrument Selection: 
- Enable users to select and interact with dental instruments within the virtual environment, fostering familiarity and dexterity.

##### Virtual Dental Operations: 
- Allow users to conduct virtual dental operations, reinforcing practical skills and promoting the application of theoretical knowledge.

##### Radiograph Selection: 
- Give users the ability to choose and analyze relevant radiographs, enhancing diagnostic skills and understanding.

##### Haptic Device Integration: 
- Incorporate haptic devices to simulate tactile sensations, providing a more immersive and realistic learning experience.

##### Virtual Reality (VR) Application: 
- Extend the platform to support VR usage, offering a fully immersive, hands-on training experience in a risk-free, virtual environment.

### Intelligent Tutoring System

##### Existing System 

- The virtual patient web interface was designed including the main three phases of patient assessment in dentistry (History taking, Examination and Investigation, Diagnosis

### Enhancement to the system

#### Expanded Clinical Case Database: 
- Increase the number and diversity of clinical cases to provide a comprehensive learning experience.
- 
##### Enhanced Patient Visualization: 
- Incorporate 3D facial modeling to provide a more realistic extraoral view, improving diagnostic and treatment planning skills.
- 
##### Advanced Auto-Suggest Feature: 
- Implement an auto-suggestion system that recommends dental clinical terms as users type, improving efficiency and accuracy

##### Improved Question Flow Testing: 
-Implement testing to verify the correct sequence of questions based on patient responses.

##### Dynamic Question Paraphrasing: 
- Refresh predefined questions and answers to add dynamism and maintain user engagement.

##### Intelligent Feedback Mechanism: 
- Develop a smart feedback system that guides users in choosing relevant questions and improves their questioning skills.

## Publications
[//]: # "Note: Uncomment each once you uploaded the files to the repository"


1. [Semester 7 report](./Publications/)
2. [Semester 7 slides](./Publications/)
<!-- 5. Author 1, Author 2 and Author 3 "Research paper title" (2021). [PDF](./). -->


## Links

[//]: # ( NOTE: EDIT THIS LINKS WITH YOUR REPO DETAILS )

- [Project Repository](https://github.com/cepdnaclk/e17-4yp-Virtual-Patient-Simulator-for-Skill-Training-in-Dentistry)
- [Project Page](https://cepdnaclk.github.io/e17-4yp-Virtual-Patient-Simulator-for-Skill-Training-in-Dentistry)
- [Department of Computer Engineering](http://www.ce.pdn.ac.lk/)
- [University of Peradeniya](https://eng.pdn.ac.lk/)

[//]: # "Please refer this to learn more about Markdown syntax"
[//]: # "https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
