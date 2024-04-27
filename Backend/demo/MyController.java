package com.example.demo;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class MyController {
	
	@Autowired
	UserRepo userRepo;
	@Autowired
	TestRepo testRepo;
	@Autowired
	QuestionRepo questionRepo;
	@Autowired
	LogRepo logRepo;
	
	@RequestMapping("acceptreject{id}")
	public int acceptreject(@PathVariable int id, @RequestBody int verify) {
		try {
			Log log=logRepo.findById(id).get();
			log.verify=verify;
			logRepo.save(log);
			return 1;
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}
	
	@RequestMapping("getAllLogsForVerification")
	public List<Log> getAllLogsForVerification(){
		return logRepo.findBySubmitAndVerify(1, 0);
	}
	
	@RequestMapping("submit{id}")
	public int submit(@PathVariable int id) {
		try {
			Log log=logRepo.findById(id).get();
			log.submit=1;
			logRepo.save(log);
			return 1;
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}
	
	@RequestMapping("update{id}")
	public int update (@PathVariable int id,@RequestBody String answer) {
		try {
			Log log=logRepo.findById(id).get();
			log.answer=answer;
			logRepo.save(log);
			return 1;
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}
	
	@RequestMapping("giveMeTestLogs{userId}and{testId}")
	public List<Log> giveMeTestLogs(@PathVariable int userId, @PathVariable int testId)
	{
		int count=logRepo.countByUserIdAndTestId(userId, testId);
		if(count==0) {
			Test test=testRepo.findById(testId).get();
			User user=userRepo.findById(userId).get();
			for(int i=0;i<test.questionCount;i++) {
				Log log=new Log();
				log.answer="";
				Question question=questionRepo.findRandomQuestion().get();			
				log.question=question;
				log.test=test;
				log.user=user;
				log.submit=0;
				log.verify=0;
				logRepo.save(log);
						}
		}
		return logRepo.findByUserIdAndTestId(userId, testId);
	}
	
	@RequestMapping("giveActiveTests")
	public List<Test> giveActiveTests(){
		List<Test> tests=testRepo.findAll();
		List<Test> testsUi=new ArrayList<>();
		
		Date date=new Date();
		long now=date.getTime();
		
		for(Test test:tests) {
			Date start=test.getStart();
			Date end=test.getEnd();
			long startMili=start.getTime();
			long endMili=end.getTime();
			if(now>startMili && now<endMili){
				testsUi.add(test);
			}
		}
		return testsUi;
	}
	
	@RequestMapping("addQuestion")
	public Question addQuestion(@RequestBody String name) {
		Question question=new Question();
		question.name=name;
		return questionRepo.save(question);
	}
	
	@RequestMapping("giveQuestion")
	public List<Question> giveQuestion(){
		return questionRepo.findAll();
	}
	
	@RequestMapping("addTest")
	public Test addTest(@RequestBody Test test) {
		return testRepo.save(test);
	}
	
	@RequestMapping("giveTests")
	public List<Test> giveTests(){
		
		List<Test> list=testRepo.findAll();
		
		for(Test test:list) {
			String result="";
			
			List<User> users=userRepo.findByRole(1);
			
			for(User user:users) {
				
				int count=logRepo.countByUserIdAndTestIdAndVerify(user.id, test.id,1);
						if(count>=test.passingCount){
							result=result+user.name+" : Pass ("+count+")\n";
							
						}
						else {
							result=result+user.name+" : Fail ("+count+")\n";
						}		
			}
			test.result=result;
		}
		return list;
	}

	@RequestMapping("login{username}")
	public int[] login(@PathVariable String username, @RequestBody String password) {
		
//		index=0-loginstatus
//		index=1-userid
//		index=2-role
		try {
			int [] a=new int [3];
			int count=userRepo.countByUsername(username);
			
			if(count==0) {
				a[0]=1; //wrong username
				return a;
			}
			if(count>1) {
				a[0]=2; //multiple accounts
				return a;
			}
			User user=userRepo.findByUsername(username);
			if(user.password.equals(password)) {
				a[0]=0;  //success
				a[1]=user.id;
				a[2]=user.role;
				return a;
			}
			else {
				return a;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}	
}
