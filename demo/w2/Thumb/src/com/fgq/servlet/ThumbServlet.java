package com.fgq.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ThumbServlet extends HttpServlet {
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
//		super.doGet(req, resp);
		// 获取请求的URI地址信息
        String uri = req.getRequestURI();
        // 截取其中的方法名
        String methodName = uri.substring(uri.lastIndexOf("/")+1, uri.lastIndexOf("."));
        
        System.out.println(methodName == "addThumb");
		
		
		String driver = "com.mysql.cj.jdbc.Driver";
	    String url = "jdbc:mysql://localhost:3306/mydemo?useUnicode=true&serverTimezone=GMT&characterEncoding=utf8&useSSL=false";
	    String username = "root";
	    String password = "root";
	    Connection conn = null;
	    
	    
	    try {
	        Class.forName(driver); //classLoader,加载对应驱动
	        conn = (Connection) DriverManager.getConnection(url, username, password);
	        if(methodName.equals("addThumb")) {
	        	addThumb(conn,req,resp);
	        }else if(methodName.equals("thumb")) {
	        	thumb(conn,req,resp);
	        }
	        
	    } catch (ClassNotFoundException e) {
	        e.printStackTrace();
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }
		
//		doPost(req, resp);
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
//		super.doPost(req, resp);
		
	}
	
	protected void addThumb(Connection conn,HttpServletRequest req, HttpServletResponse resp) throws SQLException {
		resp.setHeader("Content-Type", "text/json;charset=utf-8;"); 
		PreparedStatement pstmt = null;
		String sql = "select * from t_js where id = 1";
		PrintWriter out = null;
		try {
			
			out = resp.getWriter();
			pstmt = (PreparedStatement)conn.prepareStatement(sql);
	        ResultSet rs = pstmt.executeQuery();
	        int count = 0;
	        System.out.println(rs);
	        while (rs.next()) {
	            
	        	count = rs.getInt("count");
	            System.out.println(rs.getInt("id")+" --- " + count);
	        }
	        String addSql = "update t_js SET count='"+(++count)+"' WHERE id=1";
	        pstmt = (PreparedStatement) conn.prepareStatement(addSql);
	        int sucCol = pstmt.executeUpdate();
	        
	        
			out.println("{\"ret\":0,\"msg\":\"success\",\"action\":\"add\",\"count\":"+count+"}");
			pstmt.close();
	        conn.close();
		} catch (Exception e) {
	        e.printStackTrace();
	        out.println("{\"ret\":-1,\"msg\":\"sql error\",\"action\":\"add\"}");
			pstmt.close();
	        conn.close();
	    }
	}
	protected void thumb(Connection conn,HttpServletRequest req, HttpServletResponse resp) throws SQLException {
		resp.setHeader("Content-Type", "text/json;charset=utf-8;"); 
		PreparedStatement pstmt = null;
		String sql = "select * from t_js where id = 1";
		PrintWriter out = null;
		try {
			out = resp.getWriter();
			
			pstmt = (PreparedStatement)conn.prepareStatement(sql);
	        ResultSet rs = pstmt.executeQuery();
	        int count = 0;
	        System.out.println(rs);
	        while (rs.next()) {
	            
	        	count = rs.getInt("count");
	            System.out.println(rs.getInt("id")+" --- " + count);
	        }
	        
	         
			out.println("{\"ret\":0,\"msg\":\"success\",\"action\":\"query\",\"count\":"+count+"}");
			pstmt.close();
	        conn.close();
		} catch (Exception e) {
	        e.printStackTrace();
	        out.println("{\"ret\":-1,\"msg\":\"sql error\",\"action\":\"query\"}");
			pstmt.close();
	        conn.close();
	    }
	}
}
