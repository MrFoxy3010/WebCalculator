using System.Windows;
using System.Windows.Shapes;
using System.IO;
using System;
using System.Text;
using System.Reflection;
using System.Resources;
using System.Text.Json.Nodes;
using Newtonsoft.Json;
using System.Windows.Media;
using Microsoft.Web.WebView2.Core;

namespace Calculator
{
	/// <summary>
	/// Interaction logic for MainWindow.xaml
	/// </summary>
	public partial class MainWindow : Window
	{
		protected struct JsonObject
		{
			public string Key;
			public string Value;
		}

		public MainWindow()
		{
			InitializeComponent();
		}

		private async void wv_Initialized(object sender, EventArgs e)
		{
			var opts = new CoreWebView2EnvironmentOptions { AdditionalBrowserArguments = @"--enable-features=""msWebView2EnableDraggableRegions""" };
			var webView2Environment = await CoreWebView2Environment.CreateAsync(null, null, opts);
			await webView.EnsureCoreWebView2Async(webView2Environment);
			webView.CoreWebView2.Settings.AreBrowserAcceleratorKeysEnabled = false;
			webView.CoreWebView2.Settings.AreDefaultContextMenusEnabled = false;
			webView.CoreWebView2.NavigateToString(Resource.index);
			webView.Focus();
		}

		private void webView_WebMessageReceived(object sender, Microsoft.Web.WebView2.Core.CoreWebView2WebMessageReceivedEventArgs e)
		{
			JsonObject jsonObject = JsonConvert.DeserializeObject<JsonObject>(e.WebMessageAsJson);
			if (jsonObject.Key == "click" && jsonObject.Value == "close")
			{
				webView.CoreWebView2.Stop();
				App.Current.Shutdown();
			}
		}
	}
}
